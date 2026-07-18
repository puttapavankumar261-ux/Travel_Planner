package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.TripRequestDto;
import com.travelplanner.dto.TripResponseDto;
import com.travelplanner.enums.TripStatus;
import com.travelplanner.service.TripService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    // Create Trip
    @PostMapping
    public ResponseEntity<ApiResponse<TripResponseDto>> createTrip(
            @Valid @RequestBody TripRequestDto request) {

        TripResponseDto response = tripService.createTrip(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success(
                		ApiMessages.TRIP_CREATED,
                        response));
    }

    // Get Trip By ID
    @GetMapping("/{tripId}")
    public ResponseEntity<ApiResponse<TripResponseDto>> getTripById(
            @PathVariable Long tripId) {

        TripResponseDto response = tripService.getTripById(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Trip Retrieved Successfully",
                        response));
    }

    // Get All Trips
    @GetMapping
    public ResponseEntity<ApiResponse<List<TripResponseDto>>> getAllTrips() {

        List<TripResponseDto> response =
                tripService.getAllTrips();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Trips Retrieved Successfully",
                        response));
    }

    // Get Trips By User
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<TripResponseDto>>> getTripsByUser(
            @PathVariable Long userId) {

        List<TripResponseDto> response =
                tripService.getTripsByUser(userId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "User Trips Retrieved Successfully",
                        response));
    }

    // Get Trips By Status
    @GetMapping("/status/{tripStatus}")
    public ResponseEntity<ApiResponse<List<TripResponseDto>>> getTripsByStatus(
            @PathVariable TripStatus tripStatus) {

        List<TripResponseDto> response =
                tripService.getTripsByStatus(tripStatus);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Trips Retrieved Successfully",
                        response));
    }

    // Update Trip
    @PutMapping("/{tripId}")
    public ResponseEntity<ApiResponse<TripResponseDto>> updateTrip(
            @PathVariable Long tripId,
            @Valid @RequestBody TripRequestDto request) {

        TripResponseDto response =
                tripService.updateTrip(tripId, request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRIP_UPDATED,
                        response));
    }

    // Delete Trip
    @DeleteMapping("/{tripId}")
    public ResponseEntity<ApiResponse<String>> deleteTrip(
            @PathVariable Long tripId) {

        tripService.deleteTrip(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRIP_DELETED,
                        null));
    }

}