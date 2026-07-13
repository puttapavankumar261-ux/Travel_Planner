package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryResponseDto {

    private Long itineraryId;

    private Long tripId;

    private String tripTitle;

    private Integer dayNumber;

    private String activityTitle;

    private String location;

    private LocalDate activityDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}