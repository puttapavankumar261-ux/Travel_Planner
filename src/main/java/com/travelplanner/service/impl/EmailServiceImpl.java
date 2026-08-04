package com.travelplanner.service.impl;

import com.travelplanner.dto.EmailRequestDto;
import com.travelplanner.entity.Trip;

import org.springframework.beans.factory.annotation.Value;
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
    @Value("${spring.mail.username}")
    private String fromEmail;
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(EmailRequestDto emailRequest) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(emailRequest.getTo());
            message.setSubject(emailRequest.getSubject());
            message.setText(emailRequest.getBody());

            mailSender.send(message);

        } catch (Exception e) {
            throw new EmailSendingException(
                    "Failed to send plain text email to " + emailRequest.getTo(),
                    e
            );
        }
    }

    @Override
    public void sendHtmlEmail(EmailRequestDto emailRequest) {
        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(emailRequest.getTo());
            helper.setSubject(emailRequest.getSubject());
            helper.setText(emailRequest.getBody(), true);

            mailSender.send(message);

        } catch (Exception e) {

            throw new EmailSendingException(
                    "Failed to send HTML email to " + emailRequest.getTo(),
                    e
            );
        }
    }
    
    @Override
    public void sendTripCancellationEmail(Trip trip, String reason) {

        EmailRequestDto email = new EmailRequestDto();

        email.setTo(trip.getUser().getEmail());

        email.setSubject("Trip Cancellation Notice");

        String body = """
            <html>
            <body>
                <h2>Trip Cancelled</h2>

                <p>Dear %s,</p>

                <p>We regret to inform you that your trip has been cancelled by the administrator.</p>

                <table border='1' cellpadding='8' cellspacing='0'>
                    <tr>
                        <th>Destination</th>
                        <td>%s</td>
                    </tr>
                    <tr>
                        <th>Start Date</th>
                        <td>%s</td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td>%s</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>CANCELLED</td>
                    </tr>
                </table>

                <br>

                <b>Reason:</b>
                <p>%s</p>

                <p>We apologize for the inconvenience.</p>

                <br>

                <p>Regards,<br>
                Travel Planner Team</p>

            </body>
            </html>
            """.formatted(
                trip.getUser().getFirstName(),
                trip.getDestination(),
                trip.getStartDate(),
                trip.getEndDate(),
                reason
        );

        email.setBody(body);

        sendHtmlEmail(email);
    }
}
