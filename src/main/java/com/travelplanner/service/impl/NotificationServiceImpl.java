package com.travelplanner.service.impl;

import com.travelplanner.dto.EmailRequestDto;
import com.travelplanner.enums.NotificationType;
import com.travelplanner.service.EmailService;
import com.travelplanner.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final EmailService emailService;

    public NotificationServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void sendNotification(String recipient, String subject, String message, NotificationType type) {
        log.info("Sending {} notification to {}", type, recipient);

        switch (type) {
            case EMAIL:
                EmailRequestDto emailRequest = new EmailRequestDto(recipient, subject, message);
                emailService.sendEmail(emailRequest);
                break;
            case SMS:
                log.warn("SMS notification is not yet implemented. Message: {}", message);
                break;
            case PUSH:
                log.warn("Push notification is not yet implemented. Message: {}", message);
                break;
            default:
                log.error("Unknown notification type: {}", type);
        }
    }
}
