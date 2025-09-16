// src/types.ts

// This interface matches the structure of the Job object from your backend API
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
}

// This interface matches the filter state in App.tsx
export interface SearchFilters {
  platform: string;
  jobType: string;
  experienceLevel: string;
  // These were in your mock setup but are not supported by the backend yet.
  // You can add them back later if you update the backend API.
  // salaryRange: string;
  // postedDate: string;
}

// This interface defines the shape of the data returned by the getAllJobs API call
export interface JobsApiResponse {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  totalJobs: number;
}