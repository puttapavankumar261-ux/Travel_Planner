package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.travelplanner.enums.ActivityCategory;
import com.travelplanner.enums.ActivityStatus;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequestDto {

    @NotNull(message = "Trip ID is required")
    private Long tripId;

    @NotBlank(message = "Activity Name is required")
    private String activityName;

    @NotNull(message = "Activity Category is required")
    private ActivityCategory activityCategory;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Activity Date is required")
    @FutureOrPresent(message = "Activity Date cannot be in the past")
    private LocalDate activityDate;

    @NotNull(message = "Start Time is required")
    private LocalTime startTime;

    @NotNull(message = "End Time is required")
    private LocalTime endTime;

    @NotNull(message = "Estimated Cost is required")
    @PositiveOrZero(message = "Estimated Cost cannot be negative")
    private Double estimatedCost;

    @NotNull(message = "Booking Required field is required")
    private Boolean bookingRequired;

    /*
     * Generated automatically if bookingRequired = true
     */
    private String bookingReference;

    @NotNull(message = "Activity Status is required")
    private ActivityStatus activityStatus;

    private String notes;

}