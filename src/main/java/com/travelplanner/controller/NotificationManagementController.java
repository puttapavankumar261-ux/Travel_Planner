package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.dto.NotificationRequestDto;
import com.travelplanner.dto.NotificationResponseDto;
import com.travelplanner.enums.NotificationModule;
import com.travelplanner.service.NotificationManagementService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notification-management")
@RequiredArgsConstructor
public class NotificationManagementController {

    private final NotificationManagementService notificationManagementService;

    /**
     * Create Notification
     */
    @PostMapping
    public ResponseEntity<ApiResponse<NotificationResponseDto>> createNotification(
            @Valid @RequestBody NotificationRequestDto requestDto) {

        NotificationResponseDto response =
                notificationManagementService.createNotification(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success("Notification created successfully.", response));
    }

    /**
     * Get all notifications of a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<NotificationResponseDto>>> getUserNotifications(
            @PathVariable Long userId) {

        List<NotificationResponseDto> response =
                notificationManagementService.getUserNotifications(userId);

        return ResponseEntity.ok(
                ApiResponseUtil.success("Notifications fetched successfully.", response));
    }

    /**
     * Get unread notifications
     */
    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<ApiResponse<List<NotificationResponseDto>>> getUnreadNotifications(
            @PathVariable Long userId) {

        List<NotificationResponseDto> response =
                notificationManagementService.getUnreadNotifications(userId);

        return ResponseEntity.ok(
                ApiResponseUtil.success("Unread notifications fetched successfully.", response));
    }

    /**
     * Get unread notification count
     */
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<ApiResponse<Long>> getUnreadNotificationCount(
            @PathVariable Long userId) {

        long count =
                notificationManagementService.getUnreadNotificationCount(userId);

        return ResponseEntity.ok(
                ApiResponseUtil.success("Unread notification count fetched successfully.", count));
    }

    /**
     * Get admin notifications
     */
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<NotificationResponseDto>>> getAdminNotifications() {

        List<NotificationResponseDto> response =
                notificationManagementService.getAdminNotifications();

        return ResponseEntity.ok(
                ApiResponseUtil.success("Admin notifications fetched successfully.", response));
    }

    /**
     * Get notifications by module
     */
    @GetMapping("/module/{module}")
    public ResponseEntity<ApiResponse<List<NotificationResponseDto>>> getNotificationsByModule(
            @PathVariable NotificationModule module) {

        List<NotificationResponseDto> response =
                notificationManagementService.getNotificationsByModule(module);

        return ResponseEntity.ok(
                ApiResponseUtil.success("Module notifications fetched successfully.", response));
    }

    /**
     * Mark notification as read
     */
    @PutMapping("/{notificationId}/read")
    public ResponseEntity<ApiResponse<NotificationResponseDto>> markAsRead(
            @PathVariable Long notificationId) {

        NotificationResponseDto response =
                notificationManagementService.markAsRead(notificationId);

        return ResponseEntity.ok(
                ApiResponseUtil.success("Notification marked as read.", response));
    }

    /**
     * Mark all notifications as read
     */
    @PutMapping("/user/{userId}/read-all")
    public ResponseEntity<ApiResponse<Void>> markAllAsRead(
            @PathVariable Long userId) {

        notificationManagementService.markAllAsRead(userId);

        return ResponseEntity.ok(
                ApiResponseUtil.success("All notifications marked as read.", null));
    }

    /**
     * Soft delete notification
     */
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(
            @PathVariable Long notificationId) {

        notificationManagementService.deleteNotification(notificationId);

        return ResponseEntity.ok(
                ApiResponseUtil.success("Notification deleted successfully.", null));
    }
}