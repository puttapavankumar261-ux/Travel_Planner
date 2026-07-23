package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.dto.TripCompanionRequestDto;
import com.travelplanner.dto.TripCompanionResponseDto;
import com.travelplanner.service.TripCompanionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/trips/{tripId}/companions")
@RequiredArgsConstructor
public class TripCompanionController {

    private final TripCompanionService tripCompanionService;

    @PostMapping
    public ResponseEntity<TripCompanionResponseDto> addCompanion(
            @PathVariable Long tripId,
            @RequestBody TripCompanionRequestDto requestDto) {

        return new ResponseEntity<>(
                tripCompanionService.addCompanion(tripId, requestDto),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TripCompanionResponseDto>> getCompanions(
            @PathVariable Long tripId) {

        return ResponseEntity.ok(
                tripCompanionService.getCompanionsByTrip(tripId));
    }

    @PutMapping("/{companionId}")
    public ResponseEntity<TripCompanionResponseDto> updateCompanion(
            @PathVariable Long companionId,
            @RequestBody TripCompanionRequestDto requestDto) {

        return ResponseEntity.ok(
                tripCompanionService.updateCompanion(companionId, requestDto));
    }

    @DeleteMapping("/{companionId}")
    public ResponseEntity<String> deleteCompanion(
            @PathVariable Long companionId) {

        tripCompanionService.deleteCompanion(companionId);

        return ResponseEntity.ok("Companion deleted successfully.");
    }

}