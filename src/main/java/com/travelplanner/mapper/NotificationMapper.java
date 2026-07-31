package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.NotificationResponseDto;
import com.travelplanner.entity.Notification;

@Component
public class NotificationMapper {

    /**
     * Convert Notification Entity to Response DTO
     *
     * @param notification Notification Entity
     * @return NotificationResponseDto
     */
    public NotificationResponseDto toResponseDto(Notification notification) {

        if (notification == null) {
            return null;
        }

        NotificationResponseDto dto = new NotificationResponseDto();

        dto.setNotificationId(notification.getNotificationId());
        dto.setTitle(notification.getTitle());
        dto.setMessage(notification.getMessage());

        dto.setModule(notification.getModule());
        dto.setAction(notification.getAction());
        dto.setPriority(notification.getPriority());
        dto.setRecipientType(notification.getRecipientType());

        if (notification.getRecipientUser() != null) {
            dto.setRecipientUserId(notification.getRecipientUser().getUserId());
            dto.setRecipientUserName(notification.getRecipientUser().getFirstName());
        }

        if (notification.getPerformedBy() != null) {
            dto.setPerformedByUserId(notification.getPerformedBy().getUserId());
            dto.setPerformedByUserName(notification.getPerformedBy().getFirstName());
        }

        dto.setReferenceType(notification.getReferenceType());
        dto.setReferenceId(notification.getReferenceId());

        dto.setRead(notification.isRead());

        dto.setActionTime(notification.getActionTime());
        dto.setCreatedAt(notification.getCreatedAt());
        dto.setUpdatedAt(notification.getUpdatedAt());

        return dto;
    }

}