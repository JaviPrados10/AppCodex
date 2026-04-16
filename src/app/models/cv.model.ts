export interface ContactInfo {
  address: string;
  mobilePhone: string;
  landlinePhone: string;
  email: string;
  birthDate: string;
  nationality: string;
}

export interface Experience {
  company: string;
  dateRange: string;
  role: string;
  responsibilities: string[];
  stackHighlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  date: string;
}

export interface CourseItem {
  title: string;
  hours?: string;
  provider: string;
}

export interface CvProfile {
  name: string;
  mainRole: string;
  professionalSummary: string;
  contact: ContactInfo;
  experience: Experience[];
  education: EducationItem[];
  technicalSkills: string[];
  languages: string[];
  courses: CourseItem[];
  otherDetails: string[];
}
