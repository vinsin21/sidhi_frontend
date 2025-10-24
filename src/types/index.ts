// src/types.ts

// This interface now matches the structure of the Job object from your backend API
// AND includes the optional 'isBookmarked' property for the frontend.
export interface Job {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  descriptionHtml: string;
  jobType: string | null;
  experienceLevel: string | null;
  salary: string | null;
  skills: string[];
  sourceUrl: string;
  applyUrl: string;
  sourcePlatform: 'Indeed' | 'LinkedIn' | 'Naukri';
  companyLogoUrl: string | null;
  postedOn: string; // ISO date string
  createdAt: string;
  updatedAt: string;
  isBookmarked?: boolean; // <-- THIS IS THE FIX
}

// This interface matches the filter state in App.tsx
export interface SearchFilters {
  platform: string;
  jobType: string;
  experienceLevel: string;
}

// This interface defines the shape of the data returned by the getAllJobs API call
export interface JobsApiResponse {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  totalJobs: number;
}

// This is the blueprint for a User object
export interface User {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}