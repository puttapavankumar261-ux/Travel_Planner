package com.travelplanner.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTripRequestDto {

    @NotNull(message = "Trip details are required")
    @Valid
    private TripRequestDto trip;

    @Valid
    private List<TripCompanionRequestDto> companions;

}