import React, { createContext, useState, useEffect } from "react";
import { getNotificationRecords, updateAllNotificationRecords, updateNotificationRecord } from "../Services/notificationService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotificationRecords] = useState([]);
    const [loading, setLoading] = useState(false);  // Add loading state to handle UI feedback

    // Fetch notification records
    const fetchNotificationRecords = async () => {
        setLoading(true);  // Start loading
        try {
            const notifications = await getNotificationRecords();
            console.log("Successfully fetched notification records:", notifications);
            setNotificationRecords(notifications);
        } catch (error) {
            console.error("Failed to fetch notification records:", error);
        } finally {
            setLoading(false);  // End loading
        }
    };

    useEffect(() => {
        fetchNotificationRecords();
    }, []);

    // Clear all notifications and mark them as read
    const clearAllNotifications = async () => {
        setNotificationRecords([]); // Optimistically clear notifications in the UI
        try {
            await updateAllNotificationRecords();
        } catch (error) {
            console.error("Error clearing all notifications:", error);
            // Optionally handle failure here (e.g., show an error message or revert state)
        }
    };

    // Clear a single notification and mark it as read
    const clearNotification = async (notificationId) => {
        const updatedNotifications = notifications.filter(
            (notification) => notification._id !== notificationId
        );
        console.log("Updated Notifications:", updatedNotifications);
        setNotificationRecords(updatedNotifications);  // Optimistically update state

        try {
            await updateNotificationRecord(notificationId);
        } catch (error) {
            console.error(`Error updating notification ${notificationId}:`, error);
            // Optionally revert state update here if the API call fails
            setNotificationRecords(notifications);  // Revert to previous state
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, fetchNotificationRecords, clearAllNotifications, clearNotification, loading }}>
            {children}
        </NotificationContext.Provider>
    );
};
