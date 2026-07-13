package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.travelplanner.enums.ActivityCategory;
import com.travelplanner.enums.ActivityStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponseDto {

    private Long activityId;

    private Long tripId;

    private String tripTitle;

    private String activityName;

    private ActivityCategory activityCategory;

    private String location;

    private LocalDate activityDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private Double estimatedCost;

    private Boolean bookingRequired;

    private String bookingReference;

    private ActivityStatus activityStatus;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}