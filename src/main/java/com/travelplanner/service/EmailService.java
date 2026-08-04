package com.travelplanner.service;

import com.travelplanner.dto.EmailRequestDto;
import com.travelplanner.entity.Trip;

public interface EmailService {

    void sendEmail(EmailRequestDto emailRequest);

    void sendHtmlEmail(EmailRequestDto emailRequest);

    void sendTripCancellationEmail(Trip trip, String reason);
}