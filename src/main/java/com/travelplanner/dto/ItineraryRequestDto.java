package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryRequestDto {

    @NotNull(message = "Trip ID is required")
    private Long tripId;

    @NotNull(message = "Day Number is required")
    @Positive(message = "Day Number must be greater than zero")
    private Integer dayNumber;

    @NotBlank(message = "Activity Title is required")
    private String activityTitle;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Activity Date is required")
    @FutureOrPresent(message = "Activity Date cannot be in the past")
    private LocalDate activityDate;

    @NotNull(message = "Start Time is required")
    private LocalTime startTime;

    @NotNull(message = "End Time is required")
    private LocalTime endTime;

    private String notes;

}