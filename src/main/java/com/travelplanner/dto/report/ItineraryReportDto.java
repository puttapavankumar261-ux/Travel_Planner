package com.travelplanner.dto.report;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryReportDto {

    private Integer dayNumber;

    private String activityTitle;

    private String location;

    private LocalDate activityDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String notes;

}