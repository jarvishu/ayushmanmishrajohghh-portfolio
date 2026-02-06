import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PORTFOLIO_DATA_EN, PORTFOLIO_DATA_DE, PORTFOLIO_DATA_JP, UI_LABELS_MAP } from '../constants';
import { PortfolioData, UILabels, Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: PortfolioData;
  labels: UILabels;
  showApology: boolean;
  setShowApology: (show: boolean) => void;
  customData: PortfolioData | null;
  setCustomData: (data: PortfolioData | null) => void;
  updateData: (path: string, value: any) => void;
  isBuilderMode: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [showApology, setShowApology] = useState(false);

  // State for user-provided JSON
  const [customData, setCustomDataState] = useState<PortfolioData | null>(null);

  // Initialize from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_custom_data');
    if (savedData) {
      try {
        setCustomDataState(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
      }
    }
  }, []);

  const setCustomData = (data: PortfolioData | null) => {
    setCustomDataState(data);
    if (data) {
      localStorage.setItem('portfolio_custom_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('portfolio_custom_data');
    }
  };

  const updateData = (path: string, value: any) => {
    if (!customData) return;

    const newData = JSON.parse(JSON.stringify(customData));
    const parts = path.split('.');
    let current = newData;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        // If path doesn't exist, create object (simple handling)
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = value;
    setCustomData(newData);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (lang !== 'en' && !customData) {
      setShowApology(true);
    } else {
      setShowApology(false);
    }
  };

  // Determine which data to serve
  let data: PortfolioData;

  if (customData) {
    // If user provided JSON, use it strictly.
    data = customData;
  } else {
    // Fallback to demo data
    switch (language) {
      case 'de':
        data = PORTFOLIO_DATA_DE;
        break;
      case 'jp':
        data = PORTFOLIO_DATA_JP;
        break;
      default:
        data = PORTFOLIO_DATA_EN;
    }
  }

  const labels = UI_LABELS_MAP[language];
  const isBuilderMode = !!customData;

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      data,
      labels,
      showApology,
      setShowApology,
      customData,
      setCustomData,
      updateData,
      isBuilderMode
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};