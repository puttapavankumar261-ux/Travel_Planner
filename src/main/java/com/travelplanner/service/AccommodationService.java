package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.AccommodationRequestDto;
import com.travelplanner.dto.AccommodationResponseDto;
import com.travelplanner.dto.PageResponseDto;

public interface AccommodationService {

    AccommodationResponseDto createAccommodation(AccommodationRequestDto request);

    AccommodationResponseDto getAccommodationById(Long accommodationId);

    PageResponseDto<AccommodationResponseDto> getAllAccommodations(
            int page,
            int size,
            String sortBy,
            String direction);
    List<AccommodationResponseDto> getAccommodationsByTrip(Long tripId);

    AccommodationResponseDto updateAccommodation(Long accommodationId,
                                                 AccommodationRequestDto request);

    void deleteAccommodation(Long accommodationId);

}