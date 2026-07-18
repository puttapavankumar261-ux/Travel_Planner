package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.common.constants.PaginationConstants;
import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.dto.TransportationRequestDto;
import com.travelplanner.dto.TransportationResponseDto;
import com.travelplanner.service.TransportationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transportations")
@Validated
public class TransportationController {

    private final TransportationService transportationService;

    public TransportationController(TransportationService transportationService) {
        this.transportationService = transportationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TransportationResponseDto>> createTransportation(
            @Valid @RequestBody TransportationRequestDto request) {

        TransportationResponseDto response =
                transportationService.createTransportation(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success(
                        "Transportation Created Successfully",
                        response));
    }

    @GetMapping("/{transportationId}")
    public ResponseEntity<ApiResponse<TransportationResponseDto>> getTransportationById(
            @PathVariable Long transportationId) {

        TransportationResponseDto response =
                transportationService.getTransportationById(transportationId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Transportation Retrieved Successfully",
                        response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponseDto<TransportationResponseDto>>> getAllTransportations(

            @RequestParam(defaultValue = "" + PaginationConstants.DEFAULT_PAGE)
            int page,

            @RequestParam(defaultValue = "" + PaginationConstants.DEFAULT_SIZE)
            int size,

            @RequestParam(defaultValue = PaginationConstants.DEFAULT_SORT_BY)
            String sortBy,

            @RequestParam(defaultValue = PaginationConstants.DEFAULT_SORT_DIRECTION)
            String direction) {

        PageResponseDto<TransportationResponseDto> response =
                transportationService.getAllTransportations(
                        page,
                        size,
                        sortBy,
                        direction);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRANSPORTS_RETRIEVED,
                        response));
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<ApiResponse<List<TransportationResponseDto>>> getTransportationsByTrip(
            @PathVariable Long tripId) {

        List<TransportationResponseDto> response =
                transportationService.getTransportationsByTrip(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Trip Transportations Retrieved Successfully",
                        response));
    }

    @PutMapping("/{transportationId}")
    public ResponseEntity<ApiResponse<TransportationResponseDto>> updateTransportation(
            @PathVariable Long transportationId,
            @Valid @RequestBody TransportationRequestDto request) {

        TransportationResponseDto response =
                transportationService.updateTransportation(transportationId, request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Transportation Updated Successfully",
                        response));
    }

    @DeleteMapping("/{transportationId}")
    public ResponseEntity<ApiResponse<String>> deleteTransportation(
            @PathVariable Long transportationId) {

        transportationService.deleteTransportation(transportationId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Transportation Deleted Successfully",
                        null));
    }
}