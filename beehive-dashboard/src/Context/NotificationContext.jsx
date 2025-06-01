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
        if (!user || !user.access) {
            console.log("No user or access token, skipping WebSocket");
            return;
        }

        const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        const wsUrl = `${wsProtocol}${window.location.hostname}:8000/ws/alerts/?token=${encodeURIComponent(user.access)}`;
        let socket;

        const connect = () => {
            console.log("Attempting WebSocket connection:", wsUrl);
            socket = new WebSocket(wsUrl);

            socket.onopen = () => {
                console.log("✅ WebSocket connected");
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("📨 New WebSocket message:", data.message);
                const newNotification = {
                    id: Date.now(),
                    notification_message: data.message,
                    is_read: false,
                };
                setNotificationRecords((prev) => [...prev, newNotification]);
            };

            socket.onerror = (error) => {
                console.error("❌ WebSocket error:", error);
            };

            socket.onclose = (event) => {
                console.log("🔌 WebSocket disconnected:", event.code, event.reason);
                setTimeout(connect, 5000); // Reconnect after 5 seconds
            };
        };

        connect();

        return () => {
            if (socket) {
                socket.close();
                console.log("WebSocket cleanup");
            }
        };
    }, []);

    // Clear all notifications
    const clearAllNotifications = async () => {
        setNotificationRecords([]);
        try {
            await updateAllNotificationRecords();
        } catch (error) {
            console.error("Error clearing all notifications:", error);
        }
    };

    // Clear one notification
    const clearNotification = async (notificationId) => {
        const updated = notifications.filter((n) => n.id !== notificationId);
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