import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// This is the correct import path for your React project
import { User } from '../types';

// 1. Add 'isLoading' to the context's type definition
interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    // 2. Add a loading state, defaulting to true on initial load
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // On initial load, check if user data is in localStorage
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse auth data from localStorage", error);
            logout(); // Clear any corrupted data
        } finally {
            // 3. Set loading to false after we've checked localStorage
            setIsLoading(false);
        }
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        // 4. Provide the 'isLoading' state to all child components
        <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};