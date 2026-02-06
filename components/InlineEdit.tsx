import React, { useState, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface InlineEditProps {
    value: string | number;
    path: string; // Dot notation path for updateData
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    inputType?: 'text' | 'textarea' | 'number';
    className?: string; // Wrapper class
    textClassName?: string; // Text display class
    inputClassName?: string; // Input field class
    placeholder?: string;
    multiline?: boolean; // Convenience for textarea
    transformValue?: (val: any) => any; // Transform before saving (e.g. Number())
    renderChildren?: (value: string | number) => React.ReactNode; // Optional custom renderer for view mode
}

export const InlineEdit: React.FC<InlineEditProps> = ({
    value,
    path,
    as: Tag = 'span',
    inputType = 'text',
    className = '',
    textClassName = '',
    inputClassName = '',
    placeholder = 'Empty',
    multiline = false,
    transformValue,
    renderChildren
}) => {
    const { isBuilderMode, updateData } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    // Sync internal state if prop value changes (e.g. language switch)
    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const handleSave = () => {
        const finalValue = transformValue ? transformValue(tempValue) : tempValue;
        updateData(path, finalValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') handleCancel();
        // Allow Enter to save for non-multiline inputs
        if (e.key === 'Enter' && !multiline && inputType !== 'textarea') {
            handleSave();
        }
    };

    // If not builder mode, just render the text
    if (!isBuilderMode) {
        return (
            <Tag className={textClassName}>
                {renderChildren ? renderChildren(value) : value}
            </Tag>
        );
    }

    if (isEditing) {
        const InputComponent = multiline || inputType === 'textarea' ? 'textarea' : 'input';

        return (
            <div className={`inline-flex items-center gap-2 ${className}`}>
                <InputComponent
                    type={inputType === 'textarea' ? undefined : inputType}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className={`bg-white border border-blue-200 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 min-w-[100px] w-full ${inputClassName}`}
                    autoFocus
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    rows={multiline ? 3 : undefined}
                />
                <div className="flex flex-col gap-1 shrink-0 z-10">
                    <button onClick={handleSave} className="p-1 hover:bg-green-50 rounded text-green-600 bg-white shadow-sm border border-green-100">
                        <Check size={16} />
                    </button>
                    <button onClick={handleCancel} className="p-1 hover:bg-red-50 rounded text-red-500 bg-white shadow-sm border border-red-100">
                        <X size={16} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <span className={`relative inline-block group ${className}`}>
            <Tag className={`${textClassName} decoration-blue-200/50 hover:underline decoration-dashed decoration-2 underline-offset-4 cursor-text`} onClick={() => setIsEditing(true)}>
                {(renderChildren ? renderChildren(value) : value) || <span className="text-gray-300 italic">Empty</span>}
            </Tag>

            <button
                onClick={() => setIsEditing(true)}
                className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-50 rounded-full bg-white/80 shadow-sm border border-gray-100"
                title="Edit"
            >
                <Edit2 size={12} className="text-blue-500" />
            </button>
        </span>
    );
};
