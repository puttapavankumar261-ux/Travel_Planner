package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.NotificationRequestDto;
import com.travelplanner.dto.NotificationResponseDto;
import com.travelplanner.enums.NotificationModule;

public interface NotificationManagementService {

    /**
     * Create a new notification.
     */
    NotificationResponseDto createNotification(NotificationRequestDto requestDto);

    /**
     * Get all notifications for a user.
     */
    List<NotificationResponseDto> getUserNotifications(Long userId);

    /**
     * Get unread notifications for a user.
     */
    List<NotificationResponseDto> getUnreadNotifications(Long userId);

    /**
     * Get all notifications for the admin activity feed.
     */
    List<NotificationResponseDto> getAdminNotifications();

    /**
     * Get notifications by module.
     */
    List<NotificationResponseDto> getNotificationsByModule(NotificationModule module);

    /**
     * Get unread notification count.
     */
    long getUnreadNotificationCount(Long userId);

    /**
     * Mark a notification as read.
     */
    NotificationResponseDto markAsRead(Long notificationId);

    /**
     * Mark all notifications as read.
     */
    void markAllAsRead(Long userId);

    /**
     * Soft delete a notification.
     */
    void deleteNotification(Long notificationId);
}