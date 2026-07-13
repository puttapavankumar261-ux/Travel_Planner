package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ActivityResponseDto> createActivity(
            @Valid @RequestBody ActivityRequestDto request) {

        return new ResponseEntity<>(
                activityService.createActivity(request),
                HttpStatus.CREATED);
    }

    @GetMapping("/{activityId}")
    public ResponseEntity<ActivityResponseDto> getActivityById(
            @PathVariable Long activityId) {

        return ResponseEntity.ok(
                activityService.getActivityById(activityId));
    }

    @GetMapping
    public ResponseEntity<List<ActivityResponseDto>> getAllActivities() {

        return ResponseEntity.ok(
                activityService.getAllActivities());
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<ActivityResponseDto>> getActivitiesByTrip(
            @PathVariable Long tripId) {

        return ResponseEntity.ok(
                activityService.getActivitiesByTrip(tripId));
    }

    @PutMapping("/{activityId}")
    public ResponseEntity<ActivityResponseDto> updateActivity(
            @PathVariable Long activityId,
            @Valid @RequestBody ActivityRequestDto request) {

        return ResponseEntity.ok(
                activityService.updateActivity(activityId, request));
    }

    @DeleteMapping("/{activityId}")
    public ResponseEntity<String> deleteActivity(
            @PathVariable Long activityId) {

        activityService.deleteActivity(activityId);

        return ResponseEntity.ok(
                "Activity deleted successfully.");
    }

}