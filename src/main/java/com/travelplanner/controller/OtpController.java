package com.travelplanner.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.dto.OtpRequestDto;
import com.travelplanner.dto.OtpVerificationDto;
import com.travelplanner.service.OtpService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<String>> sendOtp(
            @RequestBody @Valid OtpRequestDto request) {

        otpService.generateAndSendOtp(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "OTP sent successfully",
                        "Please check your email"));
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<Boolean>> verifyOtp(
            @RequestBody @Valid OtpVerificationDto request) {

        boolean verified = otpService.verifyOtp(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "OTP verified successfully",
                        verified));
    }
}