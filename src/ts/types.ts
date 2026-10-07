export type Category = 'education' | 'experience' | 'projects';

export type EducationSubCategory = 'dissertation' | 'thesis' | 'capstone' | 'research' | 'degree';

export type ExperienceSubCategory = 'fulltime' | 'parttime' | 'internship' | 'freelance';

export type ProjectSubCategory = 'frontend' | 'backend' | 'fullstack' | 'AI';

export type SubCategory = EducationSubCategory | ExperienceSubCategory | ProjectSubCategory;

interface BaseEntry {
  id: number;
  title: string;
  description: string;
  category: Category;
  tech: string[];
  image: string;
  link?: string;
}

export interface EducationEntry extends BaseEntry {
  category: 'education';
  subCategory: EducationSubCategory;
  institution: string;
  year: string;
  grade?: string;
}

export interface ExperienceEntry extends BaseEntry {
  category: 'experience';
  subCategory: ExperienceSubCategory;
  company: string;
  location: string;
  period: string;
}

export interface ProjectEntry extends BaseEntry {
  category: 'projects';
  subCategory: ProjectSubCategory;
}

export type Entry = EducationEntry | ExperienceEntry | ProjectEntry;

// Narrowing helpers
export function isEducation(e: Entry): e is EducationEntry {
  return e.category === 'education';
}
export function isExperience(e: Entry): e is ExperienceEntry {
  return e.category === 'experience';
}
export function isProject(e: Entry): e is ProjectEntry {
  return e.category === 'projects';
}
