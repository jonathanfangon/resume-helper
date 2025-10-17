export interface ResumeData {
  imageFile: File | null;
  imagePreview: string | null;
  fileType?: string;
}

export interface JobDescription {
  title: string;
  company: string;
  description: string;
  requirements: string;
}

export interface TailoredResume {
  suggestions: string[];
  updatedContent: string;
  keywordsToAdd: string[];
  skillsToHighlight: string[];
}

export interface AppState {
  step: 'upload' | 'processing' | 'results';
  resume: ResumeData;
  jobDescription: JobDescription;
  tailoredResume: TailoredResume | null;
  error: string | null;
  isLoading: boolean;
}
