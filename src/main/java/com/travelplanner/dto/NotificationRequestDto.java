package com.travelplanner.dto;

import com.travelplanner.enums.NotificationAction;
import com.travelplanner.enums.NotificationModule;
import com.travelplanner.enums.NotificationPriority;
import com.travelplanner.enums.NotificationRecipientType;
import com.travelplanner.enums.ReferenceType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NotificationRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Message is required")
    private String message;

    @NotNull(message = "Module is required")
    private NotificationModule module;

    @NotNull(message = "Action is required")
    private NotificationAction action;

    @NotNull(message = "Priority is required")
    private NotificationPriority priority;

    @NotNull(message = "Recipient Type is required")
    private NotificationRecipientType recipientType;

    /**
     * User who will receive this notification.
     * Null for ADMIN notifications.
     */
    private Long recipientUserId;

    /**
     * User who performed the action.
     */
    @NotNull(message = "Performed By User is required")
    private Long performedByUserId;

    @NotNull(message = "Reference Type is required")
    private ReferenceType referenceType;

    /**
     * Related entity id (Trip, Payment, Booking...)
     */
    private Long referenceId;
}