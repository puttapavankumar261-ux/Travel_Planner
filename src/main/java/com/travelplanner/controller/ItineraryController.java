package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<ItineraryResponseDto> createItinerary(
            @Valid @RequestBody ItineraryRequestDto request) {

        return new ResponseEntity<>(
                itineraryService.createItinerary(request),
                HttpStatus.CREATED);
    }

    @GetMapping("/{itineraryId}")
    public ResponseEntity<ItineraryResponseDto> getItineraryById(
            @PathVariable Long itineraryId) {

        return ResponseEntity.ok(
                itineraryService.getItineraryById(itineraryId));
    }

    @GetMapping
    public ResponseEntity<List<ItineraryResponseDto>> getAllItineraries() {

        return ResponseEntity.ok(
                itineraryService.getAllItineraries());
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<ItineraryResponseDto>> getItinerariesByTrip(
            @PathVariable Long tripId) {

        return ResponseEntity.ok(
                itineraryService.getItinerariesByTrip(tripId));
    }

    @PutMapping("/{itineraryId}")
    public ResponseEntity<ItineraryResponseDto> updateItinerary(
            @PathVariable Long itineraryId,
            @Valid @RequestBody ItineraryRequestDto request) {

        return ResponseEntity.ok(
                itineraryService.updateItinerary(itineraryId, request));
    }

    @DeleteMapping("/{itineraryId}")
    public ResponseEntity<String> deleteItinerary(
            @PathVariable Long itineraryId) {

        itineraryService.deleteItinerary(itineraryId);

        return ResponseEntity.ok("Itinerary deleted successfully.");
    }

}