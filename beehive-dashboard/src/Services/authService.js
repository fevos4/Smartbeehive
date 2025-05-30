// src/services/AuthService.jsx

import axios from 'axios';
import { PARENT_API_URL } from './config';

const API_URL = PARENT_API_URL;

// Register with full form fields
const register = async ({ first_name, last_name, username, password, password_confirmation, email }) => {
    const response = await axios.post(`${API_URL}/register/`, {
        first_name,
        last_name,
        username,
        password,
        password_confirmation,
        email,
    });

    return response.data;
};

// Login with username and password
const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/act_auth/token/`, {
        username,
        password,
    });

    if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } else {
        console.log("Login failed");
        return false;
    }
};

// Logout with access token in header and refresh token in body
const logout = async () => {
    const user = getCurrentUser();
    if (user?.refresh && user?.access) {
      await axios.post(
        `${API_URL}/logout/`,
        { refresh_token: user.refresh },
        {
          headers: {
            Authorization: `Bearer ${user.access}`,  // ✅ REQUIRED!
          },
        }
      );
    }
    localStorage.removeItem('user');
  };
  
  

// Get current user (can use token to hit a protected endpoint if needed)
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};
