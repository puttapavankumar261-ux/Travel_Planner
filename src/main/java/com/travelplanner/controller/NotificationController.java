package com.travelplanner.controller;

import com.travelplanner.dto.NotificationResponseDto;
import com.travelplanner.enums.NotificationType;
import com.travelplanner.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/send")
    public ResponseEntity<NotificationResponseDto> sendNotification(
            @RequestParam String recipient,
            @RequestParam String subject,
            @RequestParam String message,
            @RequestParam NotificationType type) {
        
        notificationService.sendNotification(recipient, subject, message, type);
        
        NotificationResponseDto response = new NotificationResponseDto(
                true,
                "Notification sent successfully to " + recipient
        );
                
        return ResponseEntity.ok(response);
    }
}
