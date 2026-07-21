package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.UserRequestDto;
import com.travelplanner.dto.UserResponseDto;
import com.travelplanner.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register User
    @PostMapping
    public ResponseEntity<ApiResponse<UserResponseDto>> registerUser(
            @Valid @RequestBody UserRequestDto request) {

        UserResponseDto response = userService.registerUser(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success(
                		ApiMessages.USER_CREATED,
                        response));
    }

    // Get User By ID
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponseDto>> getUserById(
            @PathVariable Long userId) {

        UserResponseDto response = userService.getUserById(userId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "User Retrieved Successfully",
                        response));
    }

    // Get All Users
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponseDto>>> getAllUsers() {

        List<UserResponseDto> response =
                userService.getAllUsers();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Users Retrieved Successfully",
                        response));
    }

    // Update User
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponseDto>> updateUser(
            @PathVariable Long userId,
            @Valid @RequestBody UserRequestDto request) {

        UserResponseDto response =
                userService.updateUser(userId, request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                		ApiMessages.USER_UPDATED,
                        response));
    }

    // Delete User
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(
            @PathVariable Long userId) {

        userService.deleteUser(userId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                		ApiMessages.USER_DELETED,
                        null));
    }

}