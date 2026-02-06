
export const handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { platform, deploymentId } = event.queryStringParameters;
    const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
    const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

    try {
        let status = 'queued';
        let url = null;

        if (platform === 'netlify') {
            if (!NETLIFY_TOKEN) throw new Error('Missing Netlify configuration');

            // DeploymentID here is actually Site ID based on previous function. 
            // We look for the latest deploy of the site.
            const deploysRes = await fetch(`https://api.netlify.com/api/v1/sites/${deploymentId}/deploys`, {
                headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
            });

            if (!deploysRes.ok) throw new Error('Failed to fetch Netlify deploys');

            const deploys = await deploysRes.json();
            const latestDeploy = deploys[0]; // Assuming first is latest

            if (latestDeploy) {
                if (latestDeploy.state === 'ready') status = 'ready';
                else if (latestDeploy.state === 'error' || latestDeploy.state === 'failed') status = 'failed';
                else status = 'building';

                url = latestDeploy.ssl_url || latestDeploy.url;
            }

        } else if (platform === 'vercel') {
            if (!VERCEL_TOKEN) throw new Error('Missing Vercel configuration');

            const deployRes = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
                headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
            });

            if (!deployRes.ok) throw new Error('Failed to fetch Vercel deployment');

            const deploy = await deployRes.json();

            if (deploy.readyState === 'READY') {
                status = 'ready';
                url = `https://${deploy.url}`;
            } else if (deploy.readyState === 'ERROR' || deploy.readyState === 'CANCELED') {
                status = 'failed';
            } else {
                status = 'building';
            }
        } else {
            throw new Error('Invalid platform');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ status, url })
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
