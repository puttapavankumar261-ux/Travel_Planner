package com.travelplanner.util;

import org.springframework.stereotype.Component;

@Component
public class TemplateUtil {

    public String getOtpEmailTemplate(String otp) {
        return "<html><body>"
                + "<h2>Your OTP for Travel Planner</h2>"
                + "<p>Please use the following One Time Password (OTP) to complete your request:</p>"
                + "<h3 style='color: blue;'>" + otp + "</h3>"
                + "<p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>"
                + "</body></html>";
    }

    public String getWelcomeEmailTemplate() {
        return "<html><body>"
                + "<h2>Welcome to Travel Planner!</h2>"
                + "<p>We are glad to have you on board.</p>"
                + "</body></html>";
    }
}
