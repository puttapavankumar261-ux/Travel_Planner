package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.TripRequestDto;
import com.travelplanner.dto.TripResponseDto;
import com.travelplanner.enums.TripStatus;

public interface TripService {

    TripResponseDto createTrip(TripRequestDto request);

    TripResponseDto getTripById(Long tripId);

    List<TripResponseDto> getAllTrips();

    List<TripResponseDto> getTripsByUser(Long userId);

    List<TripResponseDto> getTripsByStatus(TripStatus tripStatus);

    TripResponseDto updateTrip(Long tripId, TripRequestDto request);

    void deleteTrip(Long tripId);

}