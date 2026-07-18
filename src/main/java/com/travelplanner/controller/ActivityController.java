package com.travelplanner.controller;

import java.util.List;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.travelplanner.enums.ActivityCategory;
import com.travelplanner.enums.ActivityStatus;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.common.constants.PaginationConstants;
import com.travelplanner.dto.ActivityRequestDto;
import com.travelplanner.dto.ActivityResponseDto;
import com.travelplanner.dto.PageResponseDto;
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
                        ApiMessages.ACTIVITIES_RETRIEVED,
                        response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponseDto<ActivityResponseDto>>> getAllActivities(

            @RequestParam(defaultValue = "" + PaginationConstants.DEFAULT_PAGE)
            int page,

            @RequestParam(defaultValue = "" + PaginationConstants.DEFAULT_SIZE)
            int size,

            @RequestParam(defaultValue = PaginationConstants.DEFAULT_SORT_BY)
            String sortBy,

            @RequestParam(defaultValue = PaginationConstants.DEFAULT_SORT_DIRECTION)
            String direction,

            @RequestParam(required = false)
            String activityName,

            @RequestParam(required = false)
            ActivityCategory activityCategory,

            @RequestParam(required = false)
            String location,

            @RequestParam(required = false)
            ActivityStatus activityStatus,

            @RequestParam(required = false)
            Boolean bookingRequired,

            @RequestParam(required = false)
            Double minEstimatedCost,

            @RequestParam(required = false)
            Double maxEstimatedCost,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate activityDate) {

        PageResponseDto<ActivityResponseDto> response =
                activityService.getAllActivities(
                        page,
                        size,
                        sortBy,
                        direction,
                        activityName,
                        activityCategory,
                        location,
                        activityStatus,
                        bookingRequired,
                        minEstimatedCost,
                        maxEstimatedCost,
                        activityDate);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.ACTIVITIES_RETRIEVED,
                        response));
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<ApiResponse<List<ActivityResponseDto>>> getActivitiesByTrip(
            @PathVariable Long tripId) {

        List<ActivityResponseDto> response =
                activityService.getActivitiesByTrip(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                		ApiMessages.ACTIVITIES_RETRIEVED,
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