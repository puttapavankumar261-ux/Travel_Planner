package com.travelplanner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.LoginRequestDto;
import com.travelplanner.dto.LoginResponseDto;
import com.travelplanner.dto.LogoutResponseDto;
import com.travelplanner.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
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

}