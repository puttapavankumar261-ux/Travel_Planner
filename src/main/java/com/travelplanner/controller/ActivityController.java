package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.ActivityRequestDto;
import com.travelplanner.dto.ActivityResponseDto;
import com.travelplanner.service.ActivityService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/activities")
@Validated
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ActivityResponseDto>> createActivity(
            @Valid @RequestBody ActivityRequestDto request) {

        ActivityResponseDto response = activityService.createActivity(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success(
                        ApiMessages.ACTIVITY_CREATED,
                        response));
    }

    @GetMapping("/{activityId}")
    public ResponseEntity<ApiResponse<ActivityResponseDto>> getActivityById(
            @PathVariable Long activityId) {

        ActivityResponseDto response =
                activityService.getActivityById(activityId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Activity Retrieved Successfully",
                        response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ActivityResponseDto>>> getAllActivities() {

        List<ActivityResponseDto> response =
                activityService.getAllActivities();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Activities Retrieved Successfully",
                        response));
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<ApiResponse<List<ActivityResponseDto>>> getActivitiesByTrip(
            @PathVariable Long tripId) {

        List<ActivityResponseDto> response =
                activityService.getActivitiesByTrip(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Trip Activities Retrieved Successfully",
                        response));
    }

    @PutMapping("/{activityId}")
    public ResponseEntity<ApiResponse<ActivityResponseDto>> updateActivity(
            @PathVariable Long activityId,
            @Valid @RequestBody ActivityRequestDto request) {

        ActivityResponseDto response =
                activityService.updateActivity(activityId, request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.ACTIVITY_UPDATED,
                        response));
    }

    @DeleteMapping("/{activityId}")
    public ResponseEntity<ApiResponse<String>> deleteActivity(
            @PathVariable Long activityId) {

        activityService.deleteActivity(activityId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.ACTIVITY_DELETED,
                        null));
    }
}