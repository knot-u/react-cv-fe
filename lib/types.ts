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
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Project {
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
