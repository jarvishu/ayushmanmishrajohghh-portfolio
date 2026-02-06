
export const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { resumeData, platform, siteName } = JSON.parse(event.body);
        const repoName = siteName || `resume-${Date.now()}`;

        // Environment variables
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
        const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
        const TEMPLATE_OWNER = process.env.TEMPLATE_REPO_OWNER; // e.g., 'your-github-username'
        const TEMPLATE_REPO = process.env.TEMPLATE_REPO_NAME;   // e.g., 'resume-template'

        if (!GITHUB_TOKEN || !TEMPLATE_OWNER || !TEMPLATE_REPO) {
            throw new Error('Missing GitHub configuration');
        }

        // 1. Create GitHub Repo from Template
        console.log(`Creating repo ${repoName} from template...`);
        const createRepoRes = await fetch(`https://api.github.com/repos/${TEMPLATE_OWNER}/${TEMPLATE_REPO}/generate`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.baptiste-preview+json', // Required for template generation API
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                owner: TEMPLATE_OWNER, // Assuming creating in same org/user as template or authenticated user
                name: repoName,
                private: false
            })
        });

        if (!createRepoRes.ok) {
            const error = await createRepoRes.json();
            throw new Error(`Failed to create repo: ${JSON.stringify(error)}`);
        }

        const repoData = await createRepoRes.json();
        const newRepoOwner = repoData.owner.login;

        // 2. Commit resume.json
        // We need to wait a bit for repo to be ready effectively, or just retry if 404. 
        // Usually template generation takes a moment.
        // For simplicity, we assume immediate availability or handle content update.

        console.log('Committing resume.json...');
        const content = Buffer.from(JSON.stringify(resumeData, null, 2)).toString('base64');
        const path = 'src/data/resume.json';

        // First get the SHA of the file if it exists, to update it. 
        // Or just create if not. Since it's a template, it might exist.
        // Let's try to get SHA first.
        let sha = null;
        const getFileRes = await fetch(`https://api.github.com/repos/${newRepoOwner}/${repoName}/contents/${path}`, {
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });

        if (getFileRes.ok) {
            const fileData = await getFileRes.json();
            sha = fileData.sha;
        }

        const commitRes = await fetch(`https://api.github.com/repos/${newRepoOwner}/${repoName}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update resume data',
                content: content,
                sha: sha
            })
        });

        if (!commitRes.ok) {
            const error = await commitRes.json();
            throw new Error(`Failed to commit file: ${JSON.stringify(error)}`);
        }

        // 3. Deploy to Platform
        let deploymentId = null;
        let siteUrl = null;

        if (platform === 'netlify') {
            if (!NETLIFY_TOKEN) throw new Error('Missing Netlify configuration');

            // Create Site via Netlify API
            const createSiteRes = await fetch('https://api.netlify.com/api/v1/sites', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${NETLIFY_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: repoName,
                    repo: {
                        provider: 'github',
                        id: repoData.id,
                        repo: repoData.full_name,
                        private: false,
                        branch: repoData.default_branch
                    }
                })
            });

            if (!createSiteRes.ok) {
                const error = await createSiteRes.json();
                throw new Error(`Failed to create Netlify site: ${JSON.stringify(error)}`);
            }

            const siteData = await createSiteRes.json();
            siteUrl = siteData.url;

            // Netlify automatically triggers build on repo link usually. 
            // We can return the site ID as deployment ID to check status.
            deploymentId = siteData.id;

        } else if (platform === 'vercel') {
            if (!VERCEL_TOKEN) throw new Error('Missing Vercel configuration');

            // Create Project and Deploy
            // Vercel API is slightly different, usually requires linking project first.
            // But we can use the "Deploy a Git Repo" flow via API.

            const createProjRes = await fetch('https://api.vercel.com/v9/projects', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VERCEL_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: repoName,
                    gitRepository: {
                        type: 'github',
                        repo: repoData.full_name
                    }
                })
            });

            if (!createProjRes.ok) {
                const error = await createProjRes.json();
                throw new Error(`Failed to create Vercel project: ${JSON.stringify(error)}`);
            }

            const projectData = await createProjRes.json();

            // Trigger a deployment
            const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${VERCEL_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: repoName,
                    project: projectData.id,
                    gitSource: {
                        type: 'github',
                        repoId: repoData.id,
                        ref: repoData.default_branch
                    }
                })
            });

            if (!deployRes.ok) {
                const error = await deployRes.json();
                throw new Error(`Failed to trigger Vercel deployment: ${JSON.stringify(error)}`);
            }

            const deployData = await deployRes.json();
            deploymentId = deployData.id;
            // Default Vercel URL structure or get from deployData ??
            // Vercel usually returns a preview URL immediately or a project URL.
            siteUrl = `https://${repoName}.vercel.app`; // Simplified assumption
        } else {
            throw new Error('Invalid platform');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Deployment triggered',
                deploymentId,
                platform,
                repoUrl: repoData.html_url,
                siteUrl
            })
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
