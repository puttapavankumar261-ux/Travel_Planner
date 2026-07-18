package com.travelplanner.service;

import com.travelplanner.enums.NotificationType;

public interface NotificationService {
    void sendNotification(String recipient, String subject, String message, NotificationType type);
}
