package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<AccommodationResponseDto> createAccommodation(
            @Valid @RequestBody AccommodationRequestDto request) {

        return new ResponseEntity<>(
                accommodationService.createAccommodation(request),
                HttpStatus.CREATED);
    }

    @GetMapping("/{accommodationId}")
    public ResponseEntity<AccommodationResponseDto> getAccommodationById(
            @PathVariable Long accommodationId) {

        return ResponseEntity.ok(
                accommodationService.getAccommodationById(accommodationId));
    }

    @GetMapping
    public ResponseEntity<List<AccommodationResponseDto>> getAllAccommodations() {

        return ResponseEntity.ok(
                accommodationService.getAllAccommodations());
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<AccommodationResponseDto>> getAccommodationsByTrip(
            @PathVariable Long tripId) {

        return ResponseEntity.ok(
                accommodationService.getAccommodationsByTrip(tripId));
    }

    @PutMapping("/{accommodationId}")
    public ResponseEntity<AccommodationResponseDto> updateAccommodation(
            @PathVariable Long accommodationId,
            @Valid @RequestBody AccommodationRequestDto request) {

        return ResponseEntity.ok(
                accommodationService.updateAccommodation(accommodationId, request));
    }

    @DeleteMapping("/{accommodationId}")
    public ResponseEntity<String> deleteAccommodation(
            @PathVariable Long accommodationId) {

        accommodationService.deleteAccommodation(accommodationId);

        return ResponseEntity.ok("Accommodation deleted successfully.");
    }

}