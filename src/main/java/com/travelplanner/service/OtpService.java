package com.travelplanner.service;

import com.travelplanner.dto.OtpRequestDto;
import com.travelplanner.dto.OtpVerificationDto;

public interface OtpService {
    void generateAndSendOtp(OtpRequestDto otpRequestDto);
    boolean verifyOtp(OtpVerificationDto otpVerificationDto);
}
