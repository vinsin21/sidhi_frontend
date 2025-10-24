import axios from 'axios';
import { Job, JobsApiResponse, SearchFilters } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Update the parameters to include an optional token
interface GetAllJobsParams extends SearchFilters {
  search?: string;
  location?: string;
  page?: number;
  limit?: number;
  token?: string | null;
}

export const getAllJobs = async (params: GetAllJobsParams): Promise<JobsApiResponse> => {
  const { token, ...filters } = params;

  const config: { params: URLSearchParams, headers?: any } = {
    params: new URLSearchParams()
  };

  // Build query parameters from the filters object
  if (filters.search) config.params.append('search', filters.search);
  if (filters.location) config.params.append('location', filters.location);
  if (filters.platform && filters.platform !== 'all') config.params.append('sourcePlatform', filters.platform);
  if (filters.jobType && filters.jobType !== 'all') config.params.append('jobType', filters.jobType);
  if (filters.experienceLevel && filters.experienceLevel !== 'all') config.params.append('experienceLevel', filters.experienceLevel);
  if (filters.page) config.params.append('page', filters.page.toString());
  if (filters.limit) config.params.append('limit', filters.limit.toString());

  // If a token is provided, add it to the request headers
  if (token) {
    config.headers = {
      'Authorization': `Bearer ${token}`
    };
  }

  try {
    const response = await api.get('/jobs', config);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return { jobs: [], currentPage: 1, totalPages: 1, totalJobs: 0 };
  }
};

// Update this function to also accept an optional token
export const getJobById = async (jobId: string, token: string | null): Promise<Job | null> => {
  const config: { headers?: any } = {};
  if (token) {
    config.headers = {
      'Authorization': `Bearer ${token}`
    };
  }

  try {
    const response = await api.get(`/jobs/${jobId}`, config);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch job with ID ${jobId}:`, error);
    return null;
  }
};