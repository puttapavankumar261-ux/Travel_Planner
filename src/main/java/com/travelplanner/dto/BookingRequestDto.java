package com.travelplanner.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequestDto {

    private Long tripId;

    private String remarks;
}