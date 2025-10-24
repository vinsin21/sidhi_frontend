import axios from 'axios';
import { User } from '../types';

// This is the key change. It reads the backend URL from an environment variable.
// If the variable isn't set, it defaults to your local backend for safety.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

interface AuthResponse {
    user: User;
    token: string;
}

export const registerUser = async (credentials: any) => {
    // We now construct the URL dynamically
    const response = await axios.post(`${API_BASE_URL}/users/register`, credentials);
    return response.data.data;
};

export const loginUser = async (credentials: any): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return response.data.data;
};