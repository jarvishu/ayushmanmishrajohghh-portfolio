import React, { useState, useEffect } from 'react';
import { Rocket, Loader2, CheckCircle, XCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DeploymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
    const { data } = useLanguage();
    const [isDeploying, setIsDeploying] = useState(false);
    const [platform, setPlatform] = useState<'netlify' | 'vercel'>('netlify');
    const [siteName, setSiteName] = useState('');
    const [status, setStatus] = useState<'idle' | 'queued' | 'building' | 'ready' | 'failed'>('idle');
    const [liveUrl, setLiveUrl] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Reset state when opened
    useEffect(() => {
        if (isOpen && status === 'idle') {
            setErrorMsg(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleDeploy = async () => {
        setIsDeploying(true);
        setStatus('queued');
        setErrorMsg(null);

        try {
            const response = await fetch('/.netlify/functions/create-repo-and-deploy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resumeData: data,
                    username: data.basics.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
                    siteName: siteName || `${data.basics.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-portfolio`,
                    platform
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Deployment failed to start');
            }

            const { deploymentId } = await response.json();

            const pollInterval = setInterval(async () => {
                try {
                    const statusRes = await fetch(`/.netlify/functions/deployment-status?platform=${platform}&deploymentId=${deploymentId}`);
                    const statusData = await statusRes.json();

                    if (statusData.status === 'ready') {
                        setStatus('ready');
                        setLiveUrl(statusData.url);
                        clearInterval(pollInterval);
                        setIsDeploying(false);
                    } else if (statusData.status === 'failed') {
                        setStatus('failed');
                        clearInterval(pollInterval);
                        setIsDeploying(false);
                    } else {
                        setStatus('building');
                    }
                } catch (e) {
                    console.error('Polling error', e);
                }
            }, 5000);

        } catch (err: any) {
            setErrorMsg(err.message);
            setStatus('failed');
            setIsDeploying(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Rocket size={20} className="text-accent" />
                        Deploy to Web
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {status === 'idle' || status === 'failed' ? (
                        <div className="space-y-6">
                            <p className="text-sm text-gray-600">
                                Create a dedicated GitHub repository and deploy your portfolio live in seconds.
                            </p>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-800 block">Choose Platform</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setPlatform('netlify')}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${platform === 'netlify' ? 'border-accent bg-blue-50 text-accent' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                                    >
                                        <span className="font-bold">Netlify</span>
                                        <span className="text-xs opacity-75">Recommended</span>
                                    </button>
                                    <button
                                        onClick={() => setPlatform('vercel')}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${platform === 'vercel' ? 'border-black bg-gray-50 text-black' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                                    >
                                        <span className="font-bold">Vercel</span>
                                        <span className="text-xs opacity-75">Fast Edge</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-800 block">Site Name (Optional)</label>
                                <input
                                    type="text"
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                    placeholder="my-awesome-portfolio"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                                />
                                <p className="text-xs text-gray-500">
                                    Leave empty to auto-generate. Your site will be: <span className="font-mono text-accent">{siteName || `${data.basics.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-portfolio`}.{platform === 'netlify' ? 'netlify.app' : 'vercel.app'}</span>
                                </p>
                            </div>

                            {status === 'failed' && (
                                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-start gap-2">
                                    <XCircle size={16} className="mt-0.5" />
                                    <div>
                                        <span className="font-medium block">Deployment Failed</span>
                                        {errorMsg}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleDeploy}
                                disabled={isDeploying}
                                className="w-full py-3 px-4 bg-accent hover:bg-accentHover text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70 flex justify-center items-center gap-2"
                            >
                                {isDeploying ? <Loader2 size={18} className="animate-spin" /> : <Rocket size={18} />}
                                {isDeploying ? 'Starting Deployment...' : 'Deploy Now'}
                            </button>
                        </div>
                    ) : (
                        <div className="py-8 text-center space-y-6">
                            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                                {status === 'ready' ? (
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in">
                                        <CheckCircle size={40} className="text-green-600" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <Loader2 size={32} className="text-blue-600 animate-pulse" />
                                    </>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xl font-bold text-gray-900">
                                    {status === 'queued' ? 'Queued' :
                                        status === 'building' ? 'Building Your Site' :
                                            'You are Live!'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {status === 'ready'
                                        ? 'Your portfolio has been successfully deployed.'
                                        : 'This usually takes about 60 seconds.'}
                                </p>
                            </div>

                            {status === 'ready' && liveUrl && (
                                <a
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-green-500/20"
                                >
                                    Visit Website
                                    <Rocket size={18} />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
