import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { InlineEdit } from './InlineEdit';
import { Code, Server, Cloud, Layout, Terminal, PenTool, Database, Smartphone, Globe, Briefcase, Users, FileText } from 'lucide-react';

interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon: any;
  categoryKey: string;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, icon: Icon, categoryKey }) => (
  <div className="skill-category bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="skill-category-header flex items-center mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-accent mr-3">
        <Icon size={20} />
      </div>
      <h3 className="skill-category-title font-bold text-lg text-primary capitalize">
        {/* We can't easily edit object keys (category names) with current InlineEdit without UI for key renaming. 
            For now, let's keep category names static or just display title. */}
        {title.replace(/([A-Z])/g, ' $1').trim()}
      </h3>
    </div>
    <div className="skills-list flex flex-wrap gap-2">
      <InlineEdit
        value={skills.join(', ')}
        path={`skills.${categoryKey}`}
        transformValue={(val) => val.split(',').map((s: string) => s.trim())}
        className="w-full"
        inputClassName="text-sm"
      />
    </div>
  </div>
);

// Helper function to guess an icon based on the category name
const getIconForCategory = (key: string) => {
  const k = key.toLowerCase();

  if (k.includes('front') || k.includes('web') || k.includes('ui')) return Layout;
  if (k.includes('back') || k.includes('api') || k.includes('server')) return Server;
  if (k.includes('cloud') || k.includes('devops') || k.includes('aws')) return Cloud;
  if (k.includes('style') || k.includes('css') || k.includes('design')) return PenTool;
  if (k.includes('test') || k.includes('qa')) return Code;
  if (k.includes('tool') || k.includes('git')) return Terminal;
  if (k.includes('data') || k.includes('sql')) return Database;
  if (k.includes('mobile') || k.includes('app')) return Smartphone;

  // HR & Other Keywords
  if (k.includes('recruit') || k.includes('talent') || k.includes('hire')) return Users;
  if (k.includes('hr') || k.includes('manage') || k.includes('oper')) return Briefcase;
  if (k.includes('policy') || k.includes('compliance')) return FileText;

  return Globe; // Default
};

export const Skills: React.FC = () => {
  const { data, labels } = useLanguage();
  const { skills } = data;

  const sectionTitle = data.labels?.skills?.title || labels.skills.title;
  const sectionSummary = data.labels?.skills?.summary || labels.skills.summary;

  return (
    <section id="skills" className="skills-section py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skills-header text-center mb-12">
          <h2 className="skills-title text-3xl font-bold text-primary">
            <InlineEdit value={sectionTitle} path="labels.skills.title" />
          </h2>
          <div className="skills-summary mt-4 text-gray-600 max-w-2xl mx-auto">
            <InlineEdit
              value={sectionSummary}
              path="labels.skills.summary"
              as="p"
              inputType="textarea"
              multiline
            />
          </div>
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(skills).map((key) => (
            <SkillCategory
              key={key}
              title={key}
              skills={skills[key]}
              icon={getIconForCategory(key)}
              categoryKey={key}
            />
          ))}
        </div>
      </div>
    </section>
  );
};