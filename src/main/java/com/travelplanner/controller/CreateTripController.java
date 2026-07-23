package com.travelplanner.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.CreateTripRequestDto;
import com.travelplanner.dto.CreateTripResponseDto;
import com.travelplanner.service.CreateTripService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/create-trip")
@RequiredArgsConstructor
public class CreateTripController {

    private final CreateTripService createTripService;

    @PostMapping
    public ResponseEntity<ApiResponse<CreateTripResponseDto>> createTrip(
            @Valid @RequestBody CreateTripRequestDto request) {

        CreateTripResponseDto response =
                createTripService.createTrip(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        ApiMessages.CREATE_TRIP_SUCCESS,
                        response));
    }
}