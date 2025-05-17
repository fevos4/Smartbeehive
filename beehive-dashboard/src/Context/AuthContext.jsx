import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const user = await AuthService.login(username, password);
            setCurrentUser(user);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (formData) => {
        setIsLoading(true);
        try {
            const user = await AuthService.register(formData);
            setCurrentUser(user); // optional: auto login after register
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await AuthService.logout();
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
