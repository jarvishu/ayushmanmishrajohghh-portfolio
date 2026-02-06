import React, { useEffect } from 'react';
import { X, Info } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ isVisible, onClose, message }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000); // Auto dismiss after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 md:right-8 z-50 animate-slideIn max-w-sm w-full">
      <div className="bg-white border-l-4 border-yellow-400 shadow-xl rounded-r-lg p-4 flex items-start gap-3">
        <div className="text-yellow-500 mt-0.5 shrink-0">
          <Info size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            {message}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};