package com.travelplanner.entity;

import java.time.LocalDateTime;

import com.travelplanner.enums.NotificationAction;
import com.travelplanner.enums.NotificationModule;
import com.travelplanner.enums.NotificationPriority;
import com.travelplanner.enums.NotificationRecipientType;
import com.travelplanner.enums.ReferenceType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 1000)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private NotificationModule module;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private NotificationAction action;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NotificationPriority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NotificationRecipientType recipientType;

    /**
     * User who receives this notification.
     * Null for admin/global notifications.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_user_id")
    private User recipientUser;

    /**
     * User who performed the action.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performed_by")
    private User performedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ReferenceType referenceType;

    /**
     * Trip ID, Payment ID, Expense ID, Booking ID, etc.
     */
    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "is_read", nullable = false)
    private boolean read = false;

    @Column(name = "is_deleted", nullable = false)
    private boolean deleted = false;

    /**
     * Exact time when the user performed the action.
     */
    @Column(name = "action_time", nullable = false)
    private LocalDateTime actionTime;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;

        if (this.actionTime == null) {
            this.actionTime = now;
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}