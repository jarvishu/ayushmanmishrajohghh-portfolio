import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Mail, Linkedin, Download } from 'lucide-react';
import { InlineEdit } from './InlineEdit';

export const Hero: React.FC = () => {
  const { data, labels } = useLanguage();
  const { basics, summary } = data;

  const availabilityLabel = data.labels?.hero?.availability || labels.hero.availability;
  const contactMeLabel = data.labels?.hero?.contactMe || labels.hero.contactMe;
  const downloadCVLabel = data.labels?.hero?.downloadCV || labels.hero.downloadCV;
  const yearsExpLabel = data.labels?.hero?.yearsExp || labels.hero.yearsExp;

  return (
    <section id="hero" className="hero-section relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="hero-content max-w-4xl mx-auto text-center">
          <div className="hero-availability inline-block mb-4 px-3 py-1 rounded-full bg-blue-100/50 text-accent font-medium text-sm border border-blue-200 backdrop-blur-sm">
            <InlineEdit
              value={basics.availability}
              path="basics.availability"
              className="mr-1"
            />
            {availabilityLabel}
          </div>
          <h1 className="hero-name text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-6">
            Hi, I'm <span className="text-accent relative inline-block">
              <InlineEdit
                value={basics.name}
                path="basics.name"
                inputClassName="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent min-w-[300px]"
              />
              {/* Underline decoration */}
              <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/30 -z-10 rounded-sm transform -rotate-1"></span>
            </span>
          </h1>
          <h2 className="hero-title text-xl sm:text-2xl font-medium text-secondary mb-6">
            <InlineEdit
              value={basics.title}
              path="basics.title"
            />
          </h2>
          <div className="hero-summary text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            <p className="mb-2 hero-tagline">
              <InlineEdit
                value={basics.tagline}
                path="basics.tagline"
              />.
            </p>
            <InlineEdit
              value={summary}
              path="summary"
              as="p"
              inputType="textarea"
              multiline
              inputClassName="min-h-[100px] text-lg w-full"
              className="hero-description"
              textClassName="hero-description-text"
            />
          </div>

          <div className="hero-actions flex flex-wrap justify-center gap-4 mb-10">
            <a
              href={`mailto:${basics.contact.email}`}
              className="hero-btn-contact inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accentHover transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              {contactMeLabel}
            </a>
            <a
              href="Ayushman_Mishra_Frontend.pdf"
              download={`${basics.name.replace(' ', '_')}_Resume.pdf`}
              className="hero-btn-download inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Download className="w-5 h-5 mr-2" />
              {downloadCVLabel}
            </a>
            <a
              href={basics.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-linkedin inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              {labels.hero.linkedin}
            </a>
          </div>

          <div className="hero-details flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="hero-location flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <InlineEdit
                value={basics.location}
                path="basics.location"
              />
            </div>
            <div className="hidden sm:block">•</div>
            <div className="hero-experience">
              <InlineEdit
                value={basics.experienceYears}
                path="basics.experienceYears"
                inputType="number"
                transformValue={Number}
                className="mr-1"
              />
              + {yearsExpLabel}
            </div>
            <div className="hidden sm:block">•</div>
            <div className="hero-open-to">
              {labels.hero.openTo}: <InlineEdit
                value={basics.preferredLocations.join(', ')}
                path="basics.preferredLocations"
                transformValue={(val) => val.split(',').map((s: string) => s.trim())}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-indigo-200 blur-3xl"></div>
      </div>
    </section>
  );
};