import React, { createContext, useState, useEffect } from "react";
import {
    getNotificationRecords,
    updateAllNotificationRecords,
    updateNotificationRecord,
} from "../Services/notificationService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotificationRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch existing notifications from backend
    const fetchNotificationRecords = async () => {
        setLoading(true);
        try {
            const data = await getNotificationRecords();
            console.log("✅ Fetched notifications:", data);
            setNotificationRecords(data);
        } catch (error) {
            console.error("❌ Failed to fetch notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    // WebSocket real-time listener
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.access) return;

        const socket = new WebSocket("ws://127.0.0.1:8000/ws/alerts/");

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("📨 New WebSocket message:", data.message);

            const newNotification = {
                id: Date.now(), // Temporary unique ID
                notification_message: data.message,
                is_read: false,
            };

            setNotificationRecords((prev) => [...prev, newNotification]);
        };

        socket.onerror = (error) => {
            console.error("❌ WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("🔌 WebSocket disconnected");
        };

        return () => socket.close(); // Clean up
    }, []);

    // Clear all
    const clearAllNotifications = async () => {
        setNotificationRecords([]); 
        try {
            await updateAllNotificationRecords();
        } catch (error) {
            console.error("Error clearing all notifications:", error);
        }
    };

    // Clear one
    const clearNotification = async (notificationId) => {
        const updated = notifications.filter(n => n.id !== notificationId);
        setNotificationRecords(updated);
        try {
            await updateNotificationRecord(notificationId);
        } catch (error) {
            console.error(`Error updating notification ${notificationId}:`, error);
            setNotificationRecords(notifications); // Revert
        }
    };

    // Initial load
    useEffect(() => {
        fetchNotificationRecords();
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                fetchNotificationRecords,
                clearAllNotifications,
                clearNotification,
                loading,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
