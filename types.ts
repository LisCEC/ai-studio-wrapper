
export interface UserInfo {
  name: string;
  date: string;
}

export type SectionType = 'COMPETENCY' | 'OPEN_TEXT' | 'DEVELOPMENT';

export interface Section {
  id: string;
  number: number;
  title: string;
  description?: string;
  type: SectionType;
  // For Competency sections
  guidingQuestions?: string[];
  // For Open Text / Dev sections
  fields?: {
    id: string;
    label: string;
    placeholder?: string;
    inputType?: 'text' | 'number';
  }[];
}

export interface CompetencyData {
  rating: number; // 1-10
  reflection: string;
}

export interface FormData {
  userInfo: UserInfo;
  // Map section ID to competency data
  competencies: Record<string, CompetencyData>; 
  // Map field ID to string values for Sec 7 & 8
  textAnswers: Record<string, string>;
}

export interface ReportData {
  summary: string;
  strengths: string[];
  improvements: string[];
  developmentPlan: string;
}
