package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.dto.TransportationRequestDto;
import com.travelplanner.dto.TransportationResponseDto;
import com.travelplanner.service.TransportationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transportations")
@Validated
public class TransportationController {

    private final TransportationService transportationService;

    public TransportationController(
            TransportationService transportationService) {

        this.transportationService = transportationService;
    }

    @PostMapping
    public ResponseEntity<TransportationResponseDto> createTransportation(
            @Valid @RequestBody TransportationRequestDto request) {

        return new ResponseEntity<>(
                transportationService.createTransportation(request),
                HttpStatus.CREATED);
    }

    @GetMapping("/{transportationId}")
    public ResponseEntity<TransportationResponseDto> getTransportationById(
            @PathVariable Long transportationId) {

        return ResponseEntity.ok(
                transportationService.getTransportationById(
                        transportationId));
    }

    @GetMapping
    public ResponseEntity<List<TransportationResponseDto>>
            getAllTransportations() {

        return ResponseEntity.ok(
                transportationService.getAllTransportations());
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<TransportationResponseDto>>
            getTransportationsByTrip(
                    @PathVariable Long tripId) {

        return ResponseEntity.ok(
                transportationService
                        .getTransportationsByTrip(tripId));
    }

    @PutMapping("/{transportationId}")
    public ResponseEntity<TransportationResponseDto>
            updateTransportation(
                    @PathVariable Long transportationId,
                    @Valid @RequestBody TransportationRequestDto request) {

        return ResponseEntity.ok(
                transportationService.updateTransportation(
                        transportationId,
                        request));
    }

    @DeleteMapping("/{transportationId}")
    public ResponseEntity<String> deleteTransportation(
            @PathVariable Long transportationId) {

        transportationService.deleteTransportation(
                transportationId);

        return ResponseEntity.ok(
                "Transportation deleted successfully.");
    }

}