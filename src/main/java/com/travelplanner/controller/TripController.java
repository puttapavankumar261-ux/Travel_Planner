package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<TripResponseDto> createTrip(
            @Valid @RequestBody TripRequestDto request) {

        TripResponseDto response = tripService.createTrip(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get Trip By ID
    @GetMapping("/{tripId}")
    public ResponseEntity<TripResponseDto> getTripById(
            @PathVariable Long tripId) {

        TripResponseDto response = tripService.getTripById(tripId);

        return ResponseEntity.ok(response);
    }

    // Get All Trips
    @GetMapping
    public ResponseEntity<List<TripResponseDto>> getAllTrips() {

        List<TripResponseDto> response = tripService.getAllTrips();

        return ResponseEntity.ok(response);
    }

    // Get Trips By User
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TripResponseDto>> getTripsByUser(
            @PathVariable Long userId) {

        List<TripResponseDto> response = tripService.getTripsByUser(userId);

        return ResponseEntity.ok(response);
    }

    // Get Trips By Status
    @GetMapping("/status/{tripStatus}")
    public ResponseEntity<List<TripResponseDto>> getTripsByStatus(
            @PathVariable TripStatus tripStatus) {

        List<TripResponseDto> response =
                tripService.getTripsByStatus(tripStatus);

        return ResponseEntity.ok(response);
    }

    // Update Trip
    @PutMapping("/{tripId}")
    public ResponseEntity<TripResponseDto> updateTrip(
            @PathVariable Long tripId,
            @Valid @RequestBody TripRequestDto request) {

        TripResponseDto response =
                tripService.updateTrip(tripId, request);

        return ResponseEntity.ok(response);
    }

    // Delete Trip
    @DeleteMapping("/{tripId}")
    public ResponseEntity<String> deleteTrip(
            @PathVariable Long tripId) {

        tripService.deleteTrip(tripId);

        return ResponseEntity.ok("Trip Deleted Successfully.");
    }

}