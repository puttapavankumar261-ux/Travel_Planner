package com.travelplanner.service;

import com.travelplanner.dto.CreateTripRequestDto;
import com.travelplanner.dto.CreateTripResponseDto;

public interface CreateTripService {

    CreateTripResponseDto createTrip(CreateTripRequestDto request);

}