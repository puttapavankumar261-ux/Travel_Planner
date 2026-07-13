package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.ItineraryRequestDto;
import com.travelplanner.dto.ItineraryResponseDto;

public interface ItineraryService {

    ItineraryResponseDto createItinerary(ItineraryRequestDto request);

    ItineraryResponseDto getItineraryById(Long itineraryId);

    List<ItineraryResponseDto> getAllItineraries();

    List<ItineraryResponseDto> getItinerariesByTrip(Long tripId);

    ItineraryResponseDto updateItinerary(Long itineraryId,
                                         ItineraryRequestDto request);

    void deleteItinerary(Long itineraryId);

}