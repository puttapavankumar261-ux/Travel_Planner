package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.ItineraryRequestDto;
import com.travelplanner.dto.ItineraryResponseDto;
import com.travelplanner.dto.PageResponseDto;

public interface ItineraryService {

    ItineraryResponseDto createItinerary(ItineraryRequestDto request);

    ItineraryResponseDto getItineraryById(Long itineraryId);

    PageResponseDto<ItineraryResponseDto> getAllItineraries(
            int page,
            int size,
            String sortBy,
            String direction);
    
    List<ItineraryResponseDto> getItinerariesByTrip(Long tripId);

    ItineraryResponseDto updateItinerary(Long itineraryId,
                                         ItineraryRequestDto request);

    void deleteItinerary(Long itineraryId);

}