import React, { useState, useRef, useEffect } from 'react';
import { Settings, PenTool, FileJson, Rocket, ChevronDown, Check, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavBarActionsProps {
    onOpenBuilder: () => void;
    onOpenDeploy: () => void;
    onToggleEdit: () => void;
}

export const NavBarActions: React.FC<NavBarActionsProps> = ({ onOpenBuilder, onOpenDeploy, onToggleEdit }) => {
    const { isBuilderMode } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAction = (action: () => void) => {
        action();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all ${isOpen || isBuilderMode
                        ? 'bg-gray-100 border-gray-300 text-gray-900 ring-4 ring-gray-50'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
            >
                <Settings size={18} className={isBuilderMode ? 'text-accent' : 'text-gray-500'} />
                <span className="hidden sm:inline font-medium text-sm">Tools</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} opacity-50`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Controls</span>
                    </div>

                    <button
                        onClick={() => handleAction(onToggleEdit)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                        {isBuilderMode ? (
                            <>
                                <LogOut size={16} className="text-red-500" />
                                <span className="text-red-600 font-medium">Exit Edit Mode</span>
                            </>
                        ) : (
                            <>
                                <PenTool size={16} className="text-green-600" />
                                <span>Enable Editing</span>
                            </>
                        )}
                        {isBuilderMode && <Check size={14} className="ml-auto text-green-500" />}
                    </button>

                    <button
                        onClick={() => handleAction(onOpenBuilder)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                        <FileJson size={16} className="text-blue-500" />
                        <span>Edit JSON</span>
                    </button>

                    <div className="my-1 border-t border-gray-100"></div>

                    <button
                        onClick={() => handleAction(onOpenDeploy)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                        <Rocket size={16} className="text-purple-500" />
                        <span>Deploy Website</span>
                    </button>
                </div>
            )}
        </div>
    );
};
