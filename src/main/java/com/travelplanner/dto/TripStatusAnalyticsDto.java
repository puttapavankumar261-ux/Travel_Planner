package com.travelplanner.dto;

import com.travelplanner.enums.TripStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TripStatusAnalyticsDto {

    private TripStatus status;

    private Long count;

}