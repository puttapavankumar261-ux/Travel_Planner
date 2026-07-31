package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.NotificationRequestDto;
import com.travelplanner.dto.NotificationResponseDto;
import com.travelplanner.enums.NotificationAction;
import com.travelplanner.enums.NotificationModule;
import com.travelplanner.enums.NotificationPriority;
import com.travelplanner.enums.NotificationRecipientType;
import com.travelplanner.enums.ReferenceType;

public interface NotificationManagementService {

    /**
     * Create a new notification.
     */
    NotificationResponseDto createNotification(NotificationRequestDto requestDto);
    NotificationResponseDto createNotification(
            String title,
            String message,
            NotificationModule module,
            NotificationAction action,
            NotificationPriority priority,
            NotificationRecipientType recipientType,
            Long recipientUserId,
            Long performedByUserId,
            ReferenceType referenceType,
            Long referenceId);
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