import axios from 'axios';
import { Job } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

/**
 * Toggles a bookmark for a specific job.
 * @param jobId The ID of the job to bookmark/unbookmark.
 * @param token The user's JWT for authentication.
 * @returns The response from the API.
 */
export const toggleBookmark = async (jobId: string, token: string) => {
    const response = await axios.post(`${API_BASE_URL}/bookmarks/toggle/${jobId}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

/**
 * Fetches all jobs bookmarked by the current user.
 * @param token The user's JWT for authentication.
 * @returns An array of the bookmarked Job objects.
 */
export const getBookmarkedJobs = async (token: string): Promise<Job[]> => {
    const response = await axios.get(`${API_BASE_URL}/bookmarks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.data;
};
