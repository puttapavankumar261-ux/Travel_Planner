package com.travelplanner.controller;

import org.springframework.http.ResponseEntity;
import com.travelplanner.dto.UserRequestDto;
import com.travelplanner.dto.UserResponseDto;
import com.travelplanner.service.UserService;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.LoginRequestDto;
import com.travelplanner.dto.LoginResponseDto;
import com.travelplanner.dto.LogoutResponseDto;
import com.travelplanner.dto.ForgotPasswordRequestDto;
import com.travelplanner.dto.OtpRequestDto;
import com.travelplanner.dto.OtpVerificationDto;
import com.travelplanner.dto.ResetPasswordDto;
import com.travelplanner.enums.OtpPurpose;
import com.travelplanner.service.AuthService;
import com.travelplanner.service.OtpService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final UserService userService;

    public AuthController(
            AuthService authService,
            OtpService otpService,
            UserService userService) {

        this.authService = authService;
        this.otpService = otpService;
        this.userService = userService;
    }
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDto>> register(
            @Valid @RequestBody UserRequestDto request) {

        UserResponseDto response = userService.registerUser(request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.REGISTRATION_SUCCESS,
                        response)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(
            @Valid @RequestBody LoginRequestDto request) {

        LoginResponseDto response = authService.login(request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(ApiMessages.LOGIN_SUCCESS, response)
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<LogoutResponseDto>> logout() {

        LogoutResponseDto response = authService.logout();

        return ResponseEntity.ok(
                ApiResponseUtil.success(ApiMessages.LOGOUT_SUCCESS, response)
        );
    }

    @PostMapping("/generate-otp")
    public ResponseEntity<ApiResponse<String>> generateOtp(@Valid @RequestBody OtpRequestDto requestDto) {
        otpService.generateAndSendOtp(requestDto);
        return ResponseEntity.ok(
                ApiResponseUtil.success("OTP has been sent to " + requestDto.getEmail(), null)
        );
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<String>> verifyOtp(@Valid @RequestBody OtpVerificationDto verificationDto) {
        otpService.verifyOtp(verificationDto);
        return ResponseEntity.ok(
                ApiResponseUtil.success("OTP verified successfully", null)
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequestDto requestDto) {
        OtpRequestDto otpRequest = new OtpRequestDto(requestDto.getEmail(), OtpPurpose.PASSWORD_RESET);
        otpService.generateAndSendOtp(otpRequest);
        return ResponseEntity.ok(
                ApiResponseUtil.success("Password reset OTP has been sent to " + requestDto.getEmail(), null)
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @Valid @RequestBody ResetPasswordDto requestDto) {

        OtpVerificationDto verificationDto =
                new OtpVerificationDto(
                        requestDto.getEmail(),
                        requestDto.getOtp(),
                        OtpPurpose.PASSWORD_RESET);

        otpService.verifyOtp(verificationDto);

        userService.updatePassword(
                requestDto.getEmail(),
                requestDto.getNewPassword());

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Password has been reset successfully",
                        null));
    }

}