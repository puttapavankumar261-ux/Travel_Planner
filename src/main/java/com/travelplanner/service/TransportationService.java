package com.travelplanner.service;

import java.time.LocalDate;
import java.util.List;

import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.dto.TransportationRequestDto;
import com.travelplanner.dto.TransportationResponseDto;
import com.travelplanner.enums.TransportStatus;
import com.travelplanner.enums.TransportType;
import com.travelplanner.enums.TravelClass;

public interface TransportationService {

    TransportationResponseDto createTransportation(
            TransportationRequestDto request);

    TransportationResponseDto getTransportationById(
            Long transportationId);

    PageResponseDto<TransportationResponseDto> getAllTransportations(
            int page,
            int size,
            String sortBy,
            String direction,
            TransportType transportType,
            String providerName,
            String source,
            String destination,
            TravelClass travelClass,
            TransportStatus transportStatus,
            Double minFare,
            Double maxFare,
            LocalDate departureDate,
            LocalDate arrivalDate);

    List<TransportationResponseDto> getTransportationsByTrip(
            Long tripId);

    TransportationResponseDto updateTransportation(
            Long transportationId,
            TransportationRequestDto request);

    void deleteTransportation(Long transportationId);

}