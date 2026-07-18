package com.travelplanner.controller;

import java.util.List;import com.travelplanner.common.constants.PaginationConstants;
import com.travelplanner.dto.PageResponseDto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.AccommodationRequestDto;
import com.travelplanner.dto.AccommodationResponseDto;
import com.travelplanner.service.AccommodationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/accommodations")
@Validated
public class AccommodationController {

    private final AccommodationService accommodationService;

    public AccommodationController(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    // Create Accommodation
    @PostMapping
    public ResponseEntity<ApiResponse<AccommodationResponseDto>> createAccommodation(
            @Valid @RequestBody AccommodationRequestDto request) {

        AccommodationResponseDto response =
                accommodationService.createAccommodation(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success(
                        ApiMessages.ACCOMMODATION_CREATED,
                        response));
    }

    // Get Accommodation By ID
    @GetMapping("/{accommodationId}")
    public ResponseEntity<ApiResponse<AccommodationResponseDto>> getAccommodationById(
            @PathVariable Long accommodationId) {

        AccommodationResponseDto response =
                accommodationService.getAccommodationById(accommodationId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Accommodation Retrieved Successfully",
                        response));
    }

    // Get All Accommodations
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponseDto<AccommodationResponseDto>>> getAllAccommodations(

            @RequestParam(defaultValue = "" + PaginationConstants.DEFAULT_PAGE)
            int page,

            @RequestParam(defaultValue = "" + PaginationConstants.DEFAULT_SIZE)
            int size,

            @RequestParam(defaultValue = PaginationConstants.DEFAULT_SORT_BY)
            String sortBy,

            @RequestParam(defaultValue = PaginationConstants.DEFAULT_SORT_DIRECTION)
            String direction) {

        PageResponseDto<AccommodationResponseDto> response =
                accommodationService.getAllAccommodations(
                        page,
                        size,
                        sortBy,
                        direction);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.ACCOMMODATIONS_RETRIEVED,
                        response));
    }

    // Get Accommodations By Trip
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<ApiResponse<List<AccommodationResponseDto>>> getAccommodationsByTrip(
            @PathVariable Long tripId) {

        List<AccommodationResponseDto> response =
                accommodationService.getAccommodationsByTrip(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Trip Accommodations Retrieved Successfully",
                        response));
    }

    // Update Accommodation
    @PutMapping("/{accommodationId}")
    public ResponseEntity<ApiResponse<AccommodationResponseDto>> updateAccommodation(
            @PathVariable Long accommodationId,
            @Valid @RequestBody AccommodationRequestDto request) {

        AccommodationResponseDto response =
                accommodationService.updateAccommodation(accommodationId, request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.ACCOMMODATION_UPDATED,
                        response));
    }

    // Delete Accommodation
    @DeleteMapping("/{accommodationId}")
    public ResponseEntity<ApiResponse<String>> deleteAccommodation(
            @PathVariable Long accommodationId) {

        accommodationService.deleteAccommodation(accommodationId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.ACCOMMODATION_DELETED,
                        null));
    }
}