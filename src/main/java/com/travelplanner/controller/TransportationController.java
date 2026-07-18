package com.travelplanner.controller;

import java.util.List;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.travelplanner.enums.TransportStatus;
import com.travelplanner.enums.TransportType;
import com.travelplanner.enums.TravelClass;

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
                        ApiMessages.TRANSPORT_CREATED,
                        response));
    }

    @GetMapping("/{transportationId}")
    public ResponseEntity<ApiResponse<TransportationResponseDto>> getTransportationById(
            @PathVariable Long transportationId) {

        TransportationResponseDto response =
                transportationService.getTransportationById(transportationId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRANSPORTS_RETRIEVED,
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
            String direction,

            @RequestParam(required = false)
            TransportType transportType,

            @RequestParam(required = false)
            String providerName,

            @RequestParam(required = false)
            String source,

            @RequestParam(required = false)
            String destination,

            @RequestParam(required = false)
            TravelClass travelClass,

            @RequestParam(required = false)
            TransportStatus transportStatus,

            @RequestParam(required = false)
            Double minFare,

            @RequestParam(required = false)
            Double maxFare,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate departureDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate arrivalDate) {

        PageResponseDto<TransportationResponseDto> response =
                transportationService.getAllTransportations(
                        page,
                        size,
                        sortBy,
                        direction,
                        transportType,
                        providerName,
                        source,
                        destination,
                        travelClass,
                        transportStatus,
                        minFare,
                        maxFare,
                        departureDate,
                        arrivalDate);

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
                        ApiMessages.TRANSPORTS_RETRIEVED,
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
                        ApiMessages.TRANSPORT_UPDATED,
                        response));
    }

    @DeleteMapping("/{transportationId}")
    public ResponseEntity<ApiResponse<String>> deleteTransportation(
            @PathVariable Long transportationId) {

        transportationService.deleteTransportation(transportationId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRANSPORT_DELETED,
                        null));
    }
}