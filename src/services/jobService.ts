// src/services/jobService.ts

import axios from 'axios';
import { Job, JobsApiResponse, SearchFilters } from '../types';

// Create an Axios instance with the base URL from your .env file
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// A type for the parameters we can pass to the getAllJobs function
interface GetAllJobsParams extends SearchFilters {
  search?: string;
  location?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetches a list of jobs from the API based on filters and search criteria.
 * @param params - The search, filter, and pagination parameters.
 * @returns A promise that resolves to the API response containing jobs and pagination info.
 */
export const getAllJobs = async (params: GetAllJobsParams): Promise<JobsApiResponse> => {
  // Build query parameters, ignoring any 'all' or empty values
  const queryParams = new URLSearchParams();

  if (params.search) queryParams.append('search', params.search);
  if (params.location) queryParams.append('location', params.location);
  if (params.platform && params.platform !== 'all') queryParams.append('sourcePlatform', params.platform);
  if (params.jobType && params.jobType !== 'all') queryParams.append('jobType', params.jobType);
  if (params.experienceLevel && params.experienceLevel !== 'all') queryParams.append('experienceLevel', params.experienceLevel);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());

  try {
    const response = await api.get(`/jobs?${queryParams.toString()}`);
    // The actual data is nested in response.data.data
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    // Return a default structure on error to prevent crashes
    return { jobs: [], currentPage: 1, totalPages: 1, totalJobs: 0 };
  }
};

/**
 * Fetches a single job by its ID from the API.
 * @param jobId - The unique identifier of the job.
 * @returns A promise that resolves to the specific job object or null if not found.
 */
export const getJobById = async (jobId: string): Promise<Job | null> => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    // The job object is nested in response.data.data
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch job with ID ${jobId}:`, error);
    return null;
  }
};