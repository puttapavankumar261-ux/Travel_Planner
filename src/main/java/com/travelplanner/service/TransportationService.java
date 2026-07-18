package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.dto.TransportationRequestDto;
import com.travelplanner.dto.TransportationResponseDto;

public interface TransportationService {

    TransportationResponseDto createTransportation(
            TransportationRequestDto request);

    TransportationResponseDto getTransportationById(
            Long transportationId);

    PageResponseDto<TransportationResponseDto> getAllTransportations(
            int page,
            int size,
            String sortBy,
            String direction);
    List<TransportationResponseDto> getTransportationsByTrip(
            Long tripId);

    TransportationResponseDto updateTransportation(
            Long transportationId,
            TransportationRequestDto request);

    void deleteTransportation(Long transportationId);

}