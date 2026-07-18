package com.travelplanner.controller;

import org.springframework.http.HttpStatus;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.common.constants.PaginationConstants;
import com.travelplanner.dto.PageResponseDto;
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
                        ApiMessages.TRIP_RETRIEVED,
                        response));
    }

    // Get All Trips (Pagination + Sorting)
 // Get All Trips (Pagination + Sorting + Filtering)
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponseDto<TripResponseDto>>> getAllTrips(

            @RequestParam(defaultValue = "" + PaginationConstants.DEFAULT_PAGE)
            int page,

            @RequestParam(defaultValue = "" + PaginationConstants.DEFAULT_SIZE)
            int size,

            @RequestParam(defaultValue = PaginationConstants.DEFAULT_SORT_BY)
            String sortBy,

            @RequestParam(defaultValue = PaginationConstants.DEFAULT_SORT_DIRECTION)
            String direction,

            @RequestParam(required = false)
            String destination,

            @RequestParam(required = false)
            TripStatus tripStatus,

            @RequestParam(required = false)
            Double minBudget,

            @RequestParam(required = false)
            Double maxBudget,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate) {

        PageResponseDto<TripResponseDto> response =
                tripService.getAllTrips(
                        page,
                        size,
                        sortBy,
                        direction,
                        destination,
                        tripStatus,
                        minBudget,
                        maxBudget,
                        startDate,
                        endDate);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRIPS_RETRIEVED,
                        response));
    }

    // Get Trips By User
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<java.util.List<TripResponseDto>>> getTripsByUser(
            @PathVariable Long userId) {

        java.util.List<TripResponseDto> response =
                tripService.getTripsByUser(userId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRIPS_RETRIEVED,
                        response));
    }

    // Get Trips By Status
    @GetMapping("/status/{tripStatus}")
    public ResponseEntity<ApiResponse<java.util.List<TripResponseDto>>> getTripsByStatus(
            @PathVariable TripStatus tripStatus) {

        java.util.List<TripResponseDto> response =
                tripService.getTripsByStatus(tripStatus);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRIPS_RETRIEVED,
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