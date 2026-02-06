import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Loader2, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const DeployResume: React.FC = () => {
    const { data } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [platform, setPlatform] = useState<'netlify' | 'vercel'>('netlify');
    const [status, setStatus] = useState<'idle' | 'queued' | 'building' | 'ready' | 'failed'>('idle');
    const [liveUrl, setLiveUrl] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDeploy = async () => {
        setIsDeploying(true);
        setStatus('queued');
        setErrorMsg(null);

        try {
            // 1. Trigger Deployment
            const response = await fetch('/.netlify/functions/create-repo-and-deploy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resumeData: data,
                    username: data.basics.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
                    platform
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Deployment failed to start');
            }

            const { deploymentId } = await response.json();

            // 2. Poll Status
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

    const getStatusIcon = () => {
        switch (status) {
            case 'queued':
            case 'building': return <Loader2 size={16} className="animate-spin text-blue-600" />;
            case 'ready': return <CheckCircle size={16} className="text-green-600" />;
            case 'failed': return <XCircle size={16} className="text-red-600" />;
            default: return <Rocket size={16} className="text-accent" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Main Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full transition-all border ${status === 'ready' ? 'bg-green-50 text-green-700 border-green-200' :
                        status === 'failed' ? 'bg-red-50 text-red-700 border-red-200' :
                            status !== 'idle' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                title={status === 'idle' ? 'Deploy Website' : `Status: ${status}`}
            >
                {getStatusIcon()}
                <span className="hidden sm:inline">
                    {status === 'idle' ? 'Deploy' :
                        status === 'ready' ? 'Live' :
                            status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''} opacity-50`} />
            </button>

            {/* Dropdown / Popover Content */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <h3 className="font-bold text-gray-800 mb-1 flex items-center justify-between">
                        Deploy Resume
                        {status === 'ready' && <span className="text-xs font-normal text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Live</span>}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">Launch your resume as a live website.</p>

                    {status === 'idle' || status === 'failed' ? (
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-700 block">Select Platform</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setPlatform('netlify')}
                                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${platform === 'netlify' ? 'border-accent bg-blue-50 text-accent font-medium' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                                    >
                                        Netlify
                                    </button>
                                    <button
                                        onClick={() => setPlatform('vercel')}
                                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${platform === 'vercel' ? 'border-black bg-gray-50 text-black font-medium' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                                    >
                                        Vercel
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleDeploy}
                                disabled={isDeploying}
                                className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accentHover text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                            >
                                {isDeploying ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />}
                                {status === 'failed' ? 'Retry Deployment' : 'Start Deployment'}
                            </button>

                            {status === 'failed' && (
                                <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100 mt-2">
                                    {errorMsg || 'Deployment failed. Check console.'}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Progress State */}
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    {status === 'ready' ? (
                                        <div className="p-2 bg-green-100 text-green-600 rounded-full"><CheckCircle size={18} /></div>
                                    ) : (
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Loader2 size={18} className="animate-spin" /></div>
                                    )}
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            {status === 'queued' ? 'Queued...' :
                                                status === 'building' ? 'Building Site...' :
                                                    'Deployment Complete!'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {status === 'ready' ? 'Your site is live worldwide.' : 'This usually takes ~1 minute.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {status === 'ready' && liveUrl && (
                                <a
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                                >
                                    Visit Live Site
                                </a>
                            )}

                            {status !== 'ready' && (
                                <div className="text-xs text-center text-gray-400">
                                    You can close this menu, we'll keep working.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
