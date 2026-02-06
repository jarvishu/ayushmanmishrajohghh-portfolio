import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PORTFOLIO_DATA_EN, PORTFOLIO_SCHEMA_TEMPLATE } from '../constants';
import { Save, RefreshCw, X, AlertCircle, FileJson, Upload, LayoutTemplate } from 'lucide-react';

export const JsonBuilder: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setCustomData, customData } = useLanguage();
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load existing data or template
    if (customData) {
      setJsonInput(JSON.stringify(customData, null, 2));
    } else {
      setJsonInput(JSON.stringify(PORTFOLIO_DATA_EN, null, 2));
    }
  }, [customData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJsonInput(content);
      setError(null); // Clear any previous errors on new upload
    };
    reader.readAsText(file);
    
    // Reset input so change event fires again if same file selected
    event.target.value = ''; 
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      
      // Basic validation checking for required root keys
      const requiredKeys = ['basics', 'experience', 'skills', 'education'];
      const missingKeys = requiredKeys.filter(key => !parsed[key]);
      
      if (missingKeys.length > 0) {
        throw new Error(`Invalid JSON: Missing required sections: ${missingKeys.join(', ')}`);
      }

      setCustomData(parsed);
      setError(null);
      onClose();
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
    }
  };

  const handleReset = () => {
    if (window.confirm("This will clear your current changes and reload the demo data. Are you sure?")) {
      setJsonInput(JSON.stringify(PORTFOLIO_DATA_EN, null, 2));
      setError(null);
    }
  };
  
  const handleLoadTemplate = () => {
     if (window.confirm("This will load a blank schema template and clear your current edits. Continue?")) {
       setJsonInput(JSON.stringify(PORTFOLIO_SCHEMA_TEMPLATE, null, 2));
       setError(null);
     }
  };

  const handleClear = () => {
     if (window.confirm("This will remove your custom data and revert to the demo portfolio. Continue?")) {
       setCustomData(null);
       onClose();
     }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slideIn">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <FileJson className="text-accent" />
              Portfolio Data Editor
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload a JSON file, load a template, or edit directly.
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative bg-slate-900">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-full p-6 bg-slate-900 text-green-400 font-mono text-sm resize-none focus:outline-none leading-relaxed"
            spellCheck="false"
            placeholder="Paste your JSON here..."
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 p-4 border-t border-red-100 flex items-start gap-3">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3">
             <input 
               type="file" 
               ref={fileInputRef} 
               onChange={handleFileUpload} 
               accept=".json" 
               className="hidden" 
             />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-700 hover:text-accent text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
              title="Upload JSON file"
            >
              <Upload size={16} />
              <span className="hidden sm:inline">Upload</span>
            </button>

            <button 
              onClick={handleLoadTemplate}
              className="text-gray-700 hover:text-accent text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
              title="Load Blank Template"
            >
              <LayoutTemplate size={16} />
              <span className="hidden sm:inline">Template</span>
            </button>

            <button 
              onClick={handleReset}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              title="Reset to Demo Data"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </button>
            
            {customData && (
              <button 
                onClick={handleClear}
                className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Revert to Demo
              </button>
            )}
          </div>
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto bg-accent hover:bg-accentHover text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save & Build
          </button>
        </div>
      </div>
    </div>
  );
};