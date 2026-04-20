export type LanguageId = "eng" | "esp" | "por";

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
}

export interface HeroData {
  name: string;
  role: string;
  summary: string;
  contact: ContactInfo;
}

export interface AboutData {
  paragraphs: string[];
}

export interface SkillsData {
  frontend: string[];
  backend: string[];
  devops: string[];
  databases: string[];
  tools: string[];
  other: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
}

export interface Language {
  id: LanguageId;
  name: string;
  level: string;
  abbreviation: string;
  description: string;
}

export interface HeroCopy {
  greeting: string;
  role: string;
  summary: string;
  viewProjects: string;
  getInTouch: string;
  linkedin: string;
}

export interface NavbarCopy {
  about: string;
  skills: string;
  experience: string;
  projects: string;
  contact: string;
}

export interface SectionCopy {
  home: string;
  about: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
  contact: string;
}

export interface AboutCopy {
  tag: string;
  title: string;
  paragraphs: string[];
}

export interface SkillsCopy {
  tag: string;
  title: string;
  categories: Record<string, string>;
}

export interface ExperienceCopy {
  tag: string;
  title: string;
  itemsById: Record<string, { role: string; responsibilities: string[] }>;
}

export interface EducationCopy {
  tag: string;
  title: string;
  itemsById: Record<string, { degree: string }>;
}

export interface LanguagesSectionCopy {
  tag: string;
  title: string;
  levels: Record<string, string>;
  itemsById: Record<string, { name: string; description: string }>;
}

export interface ProjectsCopy {
  tag: string;
  title: string;
  previewTitle: string;
  allTitle: string;
  intro: string;
  viewAll: string;
  viewAllProjects: string;
  allLoaded: string;
  loadingAria: string;
  github: string;
  live: string;
  categories: Record<string, string>;
  itemsById: Record<string, { title: string; description: string }>;
}

export interface ContactCopy {
  tag: string;
  title: string;
  summary: string;
  linkedin: string;
}

export interface LocalizedContent {
  navbar: NavbarCopy;
  sections: SectionCopy;
  hero: HeroCopy;
  about: AboutCopy;
  skills: SkillsCopy;
  experience: ExperienceCopy;
  education: EducationCopy;
  languagesSection: LanguagesSectionCopy;
  projects: ProjectsCopy;
  contact: ContactCopy;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
}

export interface PortfolioData {
  hero: HeroData;
  localizedContent: Record<LanguageId, LocalizedContent>;
  about: AboutData;
  skills: SkillsData;
  experience: ExperienceItem[];
  education: EducationItem[];
  languages: Language[];
  projects: Project[];
}

export interface ProjectsPage {
  items: Project[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}
