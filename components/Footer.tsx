import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, labels } = useLanguage();
  const { basics } = data;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-primary mb-1">{basics.name}</h3>
            <p className="text-gray-500 text-sm">{basics.title}</p>
          </div>

          <div className="flex space-x-6">
            <a href={`mailto:${basics.contact.email}`} className="text-gray-400 hover:text-accent transition-colors">
              <span className="sr-only">Email</span>
              <Mail size={24} />
            </a>
            <a href={basics.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={24} />
            </a>
             <a href={`tel:${basics.contact.phone}`} className="text-gray-400 hover:text-accent transition-colors">
              <span className="sr-only">Phone</span>
              <Phone size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} {basics.name}. {labels.footer.rights}</p>
          <p className="mt-2 md:mt-0">{labels.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
};