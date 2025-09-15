export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  platform: string;
  type: string; // full-time, part-time, contract
  experienceLevel: string; // entry, mid, senior
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
  applicationUrl: string;
  logoUrl?: string;
  isRemote: boolean;
  tags: string[];
}

export interface SearchFilters {
  platform: string;
  jobType: string;
  experienceLevel: string;
  salaryRange: string;
  postedDate: string;
}

export interface SearchParams {
  title: string;
  location: string;
}