import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2, Globe } from 'lucide-react';
import { InlineEdit } from './InlineEdit';

export const Experience: React.FC = () => {
  const { data, labels } = useLanguage();
  const { experience, basics } = data;

  // Use JSON labels if provided, otherwise fallback to language context labels
  const sectionTitle = data.labels?.experience?.title || labels.experience.title;
  const sectionSummary = (data.labels?.experience?.summary || labels.experience.summary).replace('{years}', basics.experienceYears.toString());
  const currentRoleLabel = data.labels?.experience?.currentRole || labels.experience.currentRole;
  const keyProjectsLabel = data.labels?.experience?.keyProjects || labels.experience.keyProjects;

  return (
    <section id="experience" className="experience-section py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">

        {/* Header Section */}
        <div className="experience-header flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="experience-title text-4xl sm:text-5xl font-bold text-primary mb-6">
              <InlineEdit value={sectionTitle} path="labels.experience.title" />
            </h2>
            <div className="experience-summary text-lg text-gray-600 leading-relaxed">
              <InlineEdit
                value={sectionSummary}
                path="labels.experience.summary"
                as="p"
                inputType="textarea"
                multiline
              />
            </div>
          </div>

          {/* Current Status Cards */}
          <div className="experience-status-cards flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="status-card-role bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 flex-1 lg:flex-none lg:min-w-[240px]">
              <div className="p-2.5 bg-blue-50 text-accent rounded-lg shrink-0">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  <InlineEdit value={currentRoleLabel} path="labels.experience.currentRole" />
                </p>
                <p className="text-primary font-bold text-sm sm:text-base">{basics.title}</p>
              </div>
            </div>
            <div className="status-card-location bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 flex-1 lg:flex-none lg:min-w-[240px]">
              <div className="p-2.5 bg-blue-50 text-accent rounded-lg shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{labels.experience.currentLocation}</p>
                <p className="text-primary font-bold text-sm sm:text-base">{basics.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="experience-list space-y-12">
          {experience.map((companyData, index) => (
            <div key={index} className="experience-card bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
              {/* Decorative background element for company card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[100px] -z-0 opacity-50"></div>

              <div className="relative z-10">
                {/* Company Header */}
                <div className="company-header flex flex-col md:flex-row md:items-start gap-6 mb-10 border-b border-gray-100 pb-8">
                  <div className="company-logo w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 shrink-0 overflow-hidden">
                    {companyData.companyLogo ? (
                      <img
                        src={companyData.companyLogo}
                        alt={companyData.company}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('p-3');
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const icon = document.createElement('div');
                            icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>';
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    ) : (
                      <Building2 size={32} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <h3 className="company-name text-2xl sm:text-3xl font-bold text-primary">
                          <InlineEdit value={companyData.company} path={`experience.${index}.company`} />
                        </h3>
                        <div className="company-meta flex flex-wrap items-center gap-y-2 gap-x-4 text-sm sm:text-base text-gray-500 mt-2">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={16} className="text-gray-400" />
                            <InlineEdit value={companyData.location} path={`experience.${index}.location`} />
                          </div>
                          <span className="hidden sm:inline text-gray-300">|</span>
                          <div className="flex items-center gap-1.5">
                            <Briefcase size={16} className="text-gray-400" />
                            <InlineEdit value={companyData.employmentType} path={`experience.${index}.employmentType`} />
                          </div>
                          <span className="hidden sm:inline text-gray-300">|</span>
                          <div className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-xs border border-slate-200">
                            <InlineEdit value={companyData.totalDuration} path={`experience.${index}.totalDuration`} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Featured Platforms Section */}
                    {companyData.keyPlatforms && companyData.keyPlatforms.length > 0 && (
                      <div className="key-platforms mt-5 pt-5 border-t border-dashed border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
                            {keyProjectsLabel}:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            <InlineEdit
                              value={companyData.keyPlatforms.join(', ')}
                              path={`experience.${index}.keyPlatforms`}
                              transformValue={(val) => val.split(',').map((s: string) => s.trim())}
                              className="w-full"
                              renderChildren={(val) => (
                                <div className="flex flex-wrap gap-2">
                                  {String(val).split(',').map((platform, pIdx) => (
                                    <span key={pIdx} className="platform-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition-colors cursor-default">
                                      <Globe size={12} />
                                      {platform.trim()}
                                    </span>
                                  ))}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Roles */}
                <div className="company-roles space-y-10">
                  {companyData.roles.map((role, roleIdx) => (
                    <div key={roleIdx} className="role-item relative pl-8 md:pl-0">
                      {/* Timeline Line (Mobile only) */}
                      <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-gray-100 md:hidden"></div>
                      <div className="absolute left-[-5px] top-2.5 w-3 h-3 rounded-full bg-accent border-2 border-white md:hidden shadow-sm z-10"></div>

                      <div className="grid md:grid-cols-[250px_1fr] gap-6 md:gap-10">
                        {/* Role Meta (Left column on Desktop) */}
                        <div className="role-meta md:text-right shrink-0">
                          <h4 className="role-title text-lg font-bold text-primary leading-tight mb-2">
                            <InlineEdit value={role.title} path={`experience.${index}.roles.${roleIdx}.title`} />
                          </h4>
                          <div className="role-duration inline-flex md:flex md:flex-col md:items-end items-center gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} className="md:hidden" />
                              <span className="font-medium text-accent">
                                <InlineEdit value={role.duration.from} path={`experience.${index}.roles.${roleIdx}.duration.from`} className="mr-1" />
                                —
                                <InlineEdit value={role.duration.to} path={`experience.${index}.roles.${roleIdx}.duration.to`} className="ml-1" />
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 inline-block">
                              <InlineEdit value={role.durationText.split('·')[1]?.trim() || role.durationText} path={`experience.${index}.roles.${roleIdx}.durationText`} />
                            </span>
                          </div>
                        </div>

                        {/* Role Content (Right column on Desktop) */}
                        <div className="role-content">
                          <ul className="role-responsibilities space-y-3 mb-6">
                            {role.responsibilities.map((item, i) => (
                              <li key={i} className="responsibility-item flex items-start gap-3 text-gray-600 leading-relaxed text-[15px]">
                                <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0 opacity-80" />
                                <InlineEdit
                                  value={item}
                                  path={`experience.${index}.roles.${roleIdx}.responsibilities.${i}`}
                                  as="span"
                                  className="w-full"
                                />
                              </li>
                            ))}
                          </ul>

                          {role.skills && role.skills.length > 0 && (
                            <div className="role-skills flex flex-wrap gap-2">
                              <InlineEdit
                                value={role.skills.join(', ')}
                                path={`experience.${index}.roles.${roleIdx}.skills`}
                                transformValue={(val) => val.split(',').map((s: string) => s.trim())}
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};