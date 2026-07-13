package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.AccommodationRequestDto;
import com.travelplanner.dto.AccommodationResponseDto;

public interface AccommodationService {

    AccommodationResponseDto createAccommodation(AccommodationRequestDto request);

    AccommodationResponseDto getAccommodationById(Long accommodationId);

    List<AccommodationResponseDto> getAllAccommodations();

    List<AccommodationResponseDto> getAccommodationsByTrip(Long tripId);

    AccommodationResponseDto updateAccommodation(Long accommodationId,
                                                 AccommodationRequestDto request);

    void deleteAccommodation(Long accommodationId);

}