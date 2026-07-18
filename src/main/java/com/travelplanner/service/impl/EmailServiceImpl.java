package com.travelplanner.service.impl;

import com.travelplanner.dto.EmailRequestDto;
import com.travelplanner.exception.EmailSendingException;
import com.travelplanner.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(EmailRequestDto emailRequest) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(emailRequest.getTo());
            message.setSubject(emailRequest.getSubject());
            message.setText(emailRequest.getBody());
            mailSender.send(message);
        } catch (Exception e) {
            throw new EmailSendingException("Failed to send plain text email to " + emailRequest.getTo(), e);
        }
    }

    @Override
    public void sendHtmlEmail(EmailRequestDto emailRequest) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(emailRequest.getTo());
            helper.setSubject(emailRequest.getSubject());
            helper.setText(emailRequest.getBody(), true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new EmailSendingException("Failed to send HTML email to " + emailRequest.getTo(), e);
        }
    }
}
