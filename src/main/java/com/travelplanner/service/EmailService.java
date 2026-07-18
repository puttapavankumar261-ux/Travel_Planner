package com.travelplanner.service;

import com.travelplanner.dto.EmailRequestDto;

public interface EmailService {
    void sendEmail(EmailRequestDto emailRequest);
    void sendHtmlEmail(EmailRequestDto emailRequest);
}
