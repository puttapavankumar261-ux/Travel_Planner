package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.TransportationRequestDto;
import com.travelplanner.dto.TransportationResponseDto;

public interface TransportationService {

    TransportationResponseDto createTransportation(
            TransportationRequestDto request);

    TransportationResponseDto getTransportationById(
            Long transportationId);

    List<TransportationResponseDto> getAllTransportations();

    List<TransportationResponseDto> getTransportationsByTrip(
            Long tripId);

    TransportationResponseDto updateTransportation(
            Long transportationId,
            TransportationRequestDto request);

    void deleteTransportation(Long transportationId);

}