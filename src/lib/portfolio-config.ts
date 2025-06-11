import portfolioData from './portfolio-config.json';

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
  cv: string;
  bio: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter: string;
  };
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategories {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  database: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  tags: string[];
  links: {
    demo: string;
    github: string;
  };
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface ContactInfo {
  title: string;
  description: string;
  officeHours: {
    weekdays: string;
    weekdaysTime: string;
    saturday: string;
    saturdayTime: string;
    sunday: string;
    sundayTime: string;
  };
}

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  twitterHandle: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  skills: SkillCategories;
  projects: Project[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  seo: SEOInfo;
  navigation: NavigationItem[];
}

export const config: PortfolioConfig = portfolioData as PortfolioConfig;

// Helper functions to access config data
export const getPersonalInfo = () => config.personal;
export const getSkills = () => config.skills;
export const getProjects = () => config.projects;
export const getTestimonials = () => config.testimonials;
export const getContactInfo = () => config.contact;
export const getSEOInfo = () => config.seo;
export const getNavigation = () => config.navigation;

// Utility functions
export const getProjectsByCategory = (category: string) => {
  if (category === 'All') return config.projects;
  return config.projects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedProjects = () => {
  return config.projects.slice(0, 3); // First 3 projects as featured
};

export const getAllTechnologies = () => {
  const allSkills = [
    ...config.skills.frontend,
    ...config.skills.backend,
    ...config.skills.tools,
    ...config.skills.database
  ];
  return allSkills.map(skill => skill.name);
};