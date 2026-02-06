export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
}

export interface Basics {
  name: string;
  title: string;
  tagline: string;
  location: string;
  openToRelocation: boolean;
  preferredLocations: string[];
  experienceYears: number;
  availability: string;
  contact: Contact;
}

// Changed from fixed interface to dynamic record to support any skill category name
export type Skills = Record<string, string[]>;

export interface Duration {
  from: string;
  to: string;
}

export interface ExperienceRole {
  title: string;
  duration: Duration;
  durationText: string;
  responsibilities: string[];
  skills?: string[];
}

export interface Experience {
  company: string;
  companyLogo?: string;
  employmentType: string;
  totalDuration: string;
  location: string;
  workMode?: string;
  roles: ExperienceRole[];
  keyPlatforms?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Preferences {
  rolesInterestedIn: string[];
  workType: string[];
  industries: string[];
}

// New Interface for dynamic labels
export interface SectionLabels {
  hero?: {
    availability?: string;
    contactMe?: string;
    downloadCV?: string;
    yearsExp?: string;
    linkedin?: string;
    openTo?: string;
  };
  experience?: {
    title?: string;
    summary?: string;
    currentRole?: string;
    keyProjects?: string;
  };
  skills?: {
    title?: string;
    summary?: string;
  };
  achievements?: {
    title?: string;
    education?: string;
    interests?: string;
  };
}

export interface PortfolioData {
  schemaVersion?: string;
  basics: Basics;
  labels?: SectionLabels; // Added optional labels configuration
  summary: string;
  skills: Skills;
  experience: Experience[];
  achievements: string[];
  education: Education;
  preferences: Preferences;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type Language = 'en' | 'de' | 'jp';

export interface UILabels {
  nav: {
    home: string;
    experience: string;
    skills: string;
    achievements: string;
    hireMe: string;
  };
  hero: {
    availability: string;
    contactMe: string;
    downloadCV: string;
    linkedin: string;
    yearsExp: string;
    openTo: string;
  };
  experience: {
    title: string;
    summary: string;
    currentRole: string;
    currentLocation: string;
    keyProjects: string;
  };
  skills: {
    title: string;
    summary: string;
  };
  achievements: {
    title: string;
    education: string;
    graduated: string;
    interests: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}