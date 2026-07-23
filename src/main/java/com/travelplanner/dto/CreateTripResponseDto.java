package com.travelplanner.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTripResponseDto {

    private TripResponseDto trip;

    private List<TripCompanionResponseDto> companions;

}