import axiosInstance from "../utils/axiosInstance";

/**
 * Get notifications for a specific user
 */
const getUserNotifications = async (userId) => {
    const response = await axiosInstance.get(
        `/api/notification-management/user/${userId}`
    );

    return response.data.data;
};

/**
 * Get unread notifications
 */
const getUnreadNotifications = async (userId) => {
    const response = await axiosInstance.get(
        `/api/notification-management/user/${userId}/unread`
    );

    return response.data.data;
};

/**
 * Get unread notification count
 */
const getUnreadNotificationCount = async (userId) => {
    const response = await axiosInstance.get(
        `/api/notification-management/user/${userId}/count`
    );

    return response.data.data;
};

/**
 * Mark one notification as read
 */
const markAsRead = async (notificationId) => {
    const response = await axiosInstance.put(
        `/api/notification-management/${notificationId}/read`
    );

    return response.data.data;
};

/**
 * Mark all notifications as read
 */
const markAllAsRead = async (userId) => {
    const response = await axiosInstance.put(
        `/api/notification-management/user/${userId}/read-all`
    );

    return response.data;
};

/**
 * Delete notification
 */
const deleteNotification = async (notificationId) => {
    const response = await axiosInstance.delete(
        `/api/notification-management/${notificationId}`
    );

    return response.data;
};

/**
 * Admin notification list
 */
const getAdminNotifications = async () => {
    const response = await axiosInstance.get(
        "/api/notification-management/admin"
    );

    return response.data.data;
};

/**
 * Notifications by module
 */
const getNotificationsByModule = async (module) => {
    const response = await axiosInstance.get(
        `/api/notification-management/module/${module}`
    );

    return response.data.data;
};

export default {
    getUserNotifications,
    getUnreadNotifications,
    getUnreadNotificationCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getAdminNotifications,
    getNotificationsByModule
};