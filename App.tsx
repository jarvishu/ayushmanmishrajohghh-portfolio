import React, { useState } from 'react';
import { Hero } from './components/Hero.tsx';
import { Skills } from './components/Skills.tsx';
import { Experience } from './components/Experience.tsx';
import { Achievements } from './components/Achievements.tsx';
import { Footer } from './components/Footer.tsx';
import { ChatWidget } from './components/ChatWidget.tsx';
import { Toast } from './components/Toast.tsx';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext.tsx';
import { Globe, PenTool, FileJson, Download, Upload } from 'lucide-react';
import { Language } from './types.ts';
import { JsonBuilder } from './components/JsonBuilder.tsx';
import { ResumeUploader } from './components/ResumeUploader.tsx';
import { NavBarActions } from './components/NavBarActions.tsx';
import { parseResume } from './services/geminiService.ts';

const NavBar = ({ onOpenBuilder, onOpenUploader, onOpenDeploy, onToggleEdit }: {
  onOpenBuilder: () => void;
  onOpenUploader: () => void;
  onOpenDeploy: () => void;
  onToggleEdit: () => void;
}) => {
  const { language, setLanguage, labels, isBuilderMode, data } = useLanguage();

  const cycleLanguage = () => {
    const langs: Language[] = ['en', 'de', 'jp'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  return (
    <nav className="fixed w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-primary">AM.</span>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-accent text-sm font-medium transition-colors">{labels.nav.home}</a>
            <a href="#experience" className="text-gray-600 hover:text-accent text-sm font-medium transition-colors">{labels.nav.experience}</a>
            <a href="#skills" className="text-gray-600 hover:text-accent text-sm font-medium transition-colors">{labels.nav.skills}</a>
            <a href="#achievements" className="text-gray-600 hover:text-accent text-sm font-medium transition-colors">{labels.nav.achievements}</a>

            {/* Language Switcher - Only show if NOT in builder mode (since custom data usually isn't multi-lingual) */}
            {!isBuilderMode && (
              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-accent text-sm font-medium transition-colors">
                  <Globe size={16} className="mr-1" />
                  <span className="uppercase">{language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-blue-50 text-accent font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('de')}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'de' ? 'bg-blue-50 text-accent font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Deutsch
                  </button>
                  <button
                    onClick={() => setLanguage('jp')}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'jp' ? 'bg-blue-50 text-accent font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    日本語
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="md:hidden flex items-center mr-2">
              {/* Mobile Language Toggle */}
              {!isBuilderMode && (
                <button
                  onClick={cycleLanguage}
                  className="text-gray-600 hover:text-accent"
                >
                  <span className="uppercase font-bold text-xs border border-gray-300 rounded px-1 py-0.5">{language}</span>
                </button>
              )}
            </div>

            {/* Edit Mode Toggle */}
            {/* Tools Dropdown (Edit, JSON, Deploy) */}
            <NavBarActions
              onOpenBuilder={onOpenBuilder}
              onOpenDeploy={onOpenDeploy}
              onToggleEdit={onToggleEdit}
            />

            {/* Resume Upload - Coming Soon
            <button
              onClick={onOpenUploader}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 bg-white px-3 py-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Upload size={16} className="text-accent" />
              <span>Import Resume</span>
            </button>
            */}

            {/* Header Resume Download */}
            <a
              href="Ayushman_Mishra_Frontend.pdf"
              download={`${data.basics.name.replace(' ', '_')}_Resume.pdf`}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 bg-white px-3 py-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Download size={16} className="text-accent" />
              <span>{labels.hero.downloadCV}</span>
            </a>

            <a
              href="mailto:ayushmishra.ui@gmail.com"
              className="text-sm font-medium text-white bg-primary px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              {labels.nav.hireMe}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LanguageApologyToast = () => {
  const { showApology, setShowApology } = useLanguage();

  return (
    <Toast
      isVisible={showApology}
      onClose={() => setShowApology(false)}
      message="My natural language is English, so I apologize if there are any translation mistakes."
    />
  );
};

import { DeploymentModal } from './components/DeploymentModal.tsx';

const AppContent = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const { setCustomData, setShowApology, isBuilderMode, data } = useLanguage();

  const handleToggleEdit = () => {
    if (isBuilderMode) {
      if (window.confirm("Exit Edit Mode? Your changes are saved to local storage, but reverting will switch back to demo data. Continue?")) {
        setCustomData(null);
      }
    } else {
      setCustomData(data);
    }
  };

  const handleResumeUpload = async (text: string) => {
    try {
      const parsedData = await parseResume(text);
      if (parsedData) {
        setCustomData(parsedData);
        console.log("Resume parsed and data updated!");
      }
    } catch (error) {
      console.error("Failed to parse resume:", error);
      alert("Failed to parse resume. Please check the console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar
        onOpenBuilder={() => setIsBuilderOpen(true)}
        onOpenUploader={() => setIsUploaderOpen(true)}
        onOpenDeploy={() => setIsDeployOpen(true)}
        onToggleEdit={handleToggleEdit}
      />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Achievements />
      </main>
      <Footer />
      <ChatWidget />
      <LanguageApologyToast />

      {/* Floating Edit Button for Mobile */}
      <button
        onClick={() => setIsBuilderOpen(true)}
        className="fixed bottom-6 left-6 bg-white text-gray-700 p-4 rounded-full shadow-lg border border-gray-200 z-50 sm:hidden"
        aria-label="Edit Portfolio"
      >
        <FileJson size={20} className="text-accent" />
      </button>

      {isBuilderOpen && <JsonBuilder onClose={() => setIsBuilderOpen(false)} />}

      {isUploaderOpen && (
        <ResumeUploader
          onClose={() => setIsUploaderOpen(false)}
          onUpload={handleResumeUpload}
        />
      )}

      <DeploymentModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
      />
    </div>
  );
};


function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;