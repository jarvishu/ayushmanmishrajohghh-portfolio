import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, Star } from 'lucide-react';
import { InlineEdit } from './InlineEdit';

export const Achievements: React.FC = () => {
  const { data, labels } = useLanguage();
  const { achievements, education, preferences } = data;

  const sectionTitle = data.labels?.achievements?.title || labels.achievements.title;
  const educationTitle = data.labels?.achievements?.education || labels.achievements.education;
  const interestsTitle = data.labels?.achievements?.interests || labels.achievements.interests;

  return (
    <section id="achievements" className="achievements-section py-16 bg-gray-900 text-white">
      <div className="achievements-container container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Achievements */}
          <div className="achievements-column">
            <div className="achievements-title-group flex items-center mb-8">
              <Award className="text-yellow-400 mr-3" size={32} />
              <h2 className="achievements-title text-3xl font-bold">
                <InlineEdit value={sectionTitle} path="labels.achievements.title" />
              </h2>
            </div>
            <div className="achievements-list space-y-4">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="achievement-item flex items-start bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <Star className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={18} />
                  <InlineEdit
                    value={achievement}
                    path={`achievements.${idx}`}
                    as="p"
                    className="text-gray-300 w-full"
                    inputClassName="text-gray-900 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Education & Education Details */}
          <div className="education-column">
            <div className="education-header flex items-center mb-8">
              <div className="p-2 bg-blue-900/50 rounded-lg text-blue-400 mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
              </div>
              <h2 className="education-title text-3xl font-bold">
                <InlineEdit value={educationTitle} path="labels.achievements.education" />
              </h2>
            </div>

            <div className="education-card bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="education-degree text-xl font-bold text-white mb-2">
                <InlineEdit value={education.degree} path="education.degree" />
              </h3>
              <p className="education-institution text-blue-400 mb-4">
                <InlineEdit value={education.institution} path="education.institution" />
              </p>
              <div className="education-meta flex justify-between items-center text-sm text-gray-400">
                <span>{labels.achievements.graduated}</span>
                <span className="education-year bg-gray-700 px-3 py-1 rounded-full">
                  <InlineEdit value={education.year} path="education.year" />
                </span>
              </div>
            </div>

            <div className="interests-section mt-8">
              <h3 className="interests-title text-xl font-bold mb-4">
                <InlineEdit value={interestsTitle} path="labels.achievements.interests" />
              </h3>
              <div className="interests-list flex flex-wrap gap-2">
                <InlineEdit
                  value={preferences.industries.join(', ')}
                  path="preferences.industries"
                  transformValue={(val) => val.split(',').map((s: string) => s.trim())}
                  className="w-full"
                  inputClassName="text-gray-900 bg-white"
                  renderChildren={(val) => (
                    <div className="flex flex-wrap gap-2">
                      {String(val).split(',').map((ind, i) => (
                        <span key={i} className="interest-item px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-sm text-gray-300">
                          {ind.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};