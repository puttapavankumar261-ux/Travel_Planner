package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.TripCompanionRequestDto;
import com.travelplanner.dto.TripCompanionResponseDto;

public interface TripCompanionService {

    TripCompanionResponseDto addCompanion(Long tripId,
                                          TripCompanionRequestDto requestDto);

    List<TripCompanionResponseDto> getCompanionsByTrip(Long tripId);

    TripCompanionResponseDto updateCompanion(Long companionId,
                                             TripCompanionRequestDto requestDto);

    void deleteCompanion(Long companionId);

}