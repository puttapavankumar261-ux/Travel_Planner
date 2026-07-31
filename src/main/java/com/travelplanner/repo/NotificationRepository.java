package com.travelplanner.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelplanner.entity.Notification;
import com.travelplanner.entity.User;
import com.travelplanner.enums.NotificationModule;
import com.travelplanner.enums.NotificationRecipientType;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    /**
     * Get all notifications of a user
     */
    List<Notification> findByRecipientUserAndDeletedFalseOrderByCreatedAtDesc(User recipientUser);

    /**
     * Get unread notifications of a user
     */
    List<Notification> findByRecipientUserAndReadFalseAndDeletedFalseOrderByCreatedAtDesc(User recipientUser);

    /**
     * Count unread notifications
     */
    long countByRecipientUserAndReadFalseAndDeletedFalse(User recipientUser);

    /**
     * Get all admin notifications
     */
    List<Notification> findByRecipientTypeAndDeletedFalseOrderByCreatedAtDesc(
            NotificationRecipientType recipientType);

    /**
     * Get notifications by module
     */
    List<Notification> findByModuleAndDeletedFalseOrderByCreatedAtDesc(
            NotificationModule module);

    /**
     * Get notifications created by a specific user
     */
    List<Notification> findByPerformedByAndDeletedFalseOrderByCreatedAtDesc(
            User performedBy);

    /**
     * Get notifications between two dates
     */
    List<Notification> findByCreatedAtBetweenAndDeletedFalseOrderByCreatedAtDesc(
            LocalDateTime startDate,
            LocalDateTime endDate);

    /**
     * Get notifications of a user for a module
     */
    List<Notification> findByRecipientUserAndModuleAndDeletedFalseOrderByCreatedAtDesc(
            User recipientUser,
            NotificationModule module);

    /**
     * Get all unread admin notifications
     */
    List<Notification> findByRecipientTypeAndReadFalseAndDeletedFalseOrderByCreatedAtDesc(
            NotificationRecipientType recipientType);

    /**
     * Complete activity history
     */
    List<Notification> findByDeletedFalseOrderByCreatedAtDesc();
}