package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.ItineraryRequestDto;
import com.travelplanner.dto.ItineraryResponseDto;
import com.travelplanner.service.ItineraryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/itineraries")
@Validated
public class ItineraryController {

    private final ItineraryService itineraryService;

    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    // Create Itinerary
    @PostMapping
    public ResponseEntity<ApiResponse<ItineraryResponseDto>> createItinerary(
            @Valid @RequestBody ItineraryRequestDto request) {

        ItineraryResponseDto response =
                itineraryService.createItinerary(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success(
                        ApiMessages.ITINERARY_CREATED,
                        response));
    }

    // Get Itinerary By ID
    @GetMapping("/{itineraryId}")
    public ResponseEntity<ApiResponse<ItineraryResponseDto>> getItineraryById(
            @PathVariable Long itineraryId) {

        ItineraryResponseDto response =
                itineraryService.getItineraryById(itineraryId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Itinerary Retrieved Successfully",
                        response));
    }

    // Get All Itineraries
    @GetMapping
    public ResponseEntity<ApiResponse<List<ItineraryResponseDto>>> getAllItineraries() {

        List<ItineraryResponseDto> response =
                itineraryService.getAllItineraries();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Itineraries Retrieved Successfully",
                        response));
    }

    // Get Itineraries By Trip
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<ApiResponse<List<ItineraryResponseDto>>> getItinerariesByTrip(
            @PathVariable Long tripId) {

        List<ItineraryResponseDto> response =
                itineraryService.getItinerariesByTrip(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Trip Itineraries Retrieved Successfully",
                        response));
    }

    // Update Itinerary
    @PutMapping("/{itineraryId}")
    public ResponseEntity<ApiResponse<ItineraryResponseDto>> updateItinerary(
            @PathVariable Long itineraryId,
            @Valid @RequestBody ItineraryRequestDto request) {

        ItineraryResponseDto response =
                itineraryService.updateItinerary(itineraryId, request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.ITINERARY_UPDATED,
                        response));
    }

    // Delete Itinerary
    @DeleteMapping("/{itineraryId}")
    public ResponseEntity<ApiResponse<String>> deleteItinerary(
            @PathVariable Long itineraryId) {

        itineraryService.deleteItinerary(itineraryId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.ITINERARY_DELETED,
                        null));
    }

}