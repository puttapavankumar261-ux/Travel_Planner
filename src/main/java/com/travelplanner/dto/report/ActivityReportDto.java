package com.travelplanner.dto.report;

import java.time.LocalDate;
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
public class ActivityReportDto {

    private String activityName;

    private ActivityCategory activityCategory;

    private String location;

    private LocalDate activityDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private Double estimatedCost;

    private Boolean bookingRequired;

    private ActivityStatus activityStatus;

}