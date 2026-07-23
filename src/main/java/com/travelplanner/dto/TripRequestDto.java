package com.travelplanner.dto;

import java.time.LocalDate;

import com.travelplanner.enums.TripStatus;

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
public class TripRequestDto {

    @NotBlank(message = "Trip title is required")
    private String title;

    @NotBlank(message = "Source is required")
    private String source;

    @NotBlank(message = "Destination is required")
    private String destination;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date cannot be in the past")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Budget is required")
    @Positive(message = "Budget must be greater than zero")
    private Double budget;

    private String description;

    private String tripType;

    @NotNull(message = "Trip status is required")
    private TripStatus tripStatus;

    @NotNull(message = "User ID is required")
    private Long userId;

}