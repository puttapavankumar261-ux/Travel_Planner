package com.travelplanner.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelplanner.dto.EmailRequestDto;
import com.travelplanner.service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmailTestController {

    private final EmailService emailService;

    @GetMapping("/api/test-email")
    public String sendTestEmail() {

        EmailRequestDto request = new EmailRequestDto();

        request.setTo("YOUR_EMAIL@gmail.com");

        request.setSubject("Travel Planner Test Email");

        request.setBody("""
                <h1>Congratulations 🎉</h1>

                <p>Your email configuration is working successfully.</p>
                """);

        emailService.sendHtmlEmail(request);

        return "Email Sent Successfully";
    }
}