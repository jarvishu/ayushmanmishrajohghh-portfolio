
export const handler = async (event, context) => {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const TEMPLATE_OWNER = process.env.TEMPLATE_REPO_OWNER;
    const TEMPLATE_REPO = process.env.TEMPLATE_REPO_NAME;

    try {
        // Check if template is now enabled
        const repoRes = await fetch(`https://api.github.com/repos/${TEMPLATE_OWNER}/${TEMPLATE_REPO}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const repoData = await repoRes.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                isTemplate: repoData.is_template,
                message: repoData.is_template
                    ? '✅ Template is enabled! Ready to deploy.'
                    : '❌ Template is NOT enabled. Please enable it in GitHub settings.'
            }, null, 2)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
