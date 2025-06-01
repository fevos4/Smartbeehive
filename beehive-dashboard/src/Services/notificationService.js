import axios from 'axios';
import { PARENT_API_URL } from './config';

const API_URL = `${PARENT_API_URL}/api/notifications/`;

// Retrieve accessToken from localStorage
const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.access) {
        throw new Error("Access token is missing or invalid");
    }
    return user.access;
};

// Call the API to get the notification records
export const getNotificationRecords = async () => {
    try {
        const accessToken = getAccessToken();
        const response = await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return []; // Returning an empty array in case of error
    }
};

// Call the API to update all notification records (mark as read)
export const updateAllNotificationRecords = async () => {
    try {
        const accessToken = getAccessToken();
        const response = await axios.put(`${API_URL}mark-all/`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating all notifications:", error);
    }
};

// Call the API to update a specific notification record (mark as read)
export const updateNotificationRecord = async (id) => {
    try {
        const accessToken = getAccessToken();
        const response = await axios.put(`${API_URL}${id}/mark/`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating notification ${id}:`, error);
    }
};
