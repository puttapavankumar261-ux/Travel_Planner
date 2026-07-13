package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.travelplanner.enums.TripStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponseDto {

    // Trip Information

    private Long tripId;

    private String tripTitle;

    private String destination;

    private LocalDate startDate;

    private LocalDate endDate;

    private TripStatus tripStatus;

    private Double tripBudget;

    // Financial Summary

    private Double totalExpenses;

    private Double remainingBudget;

    // Statistics

    private Long totalItineraries;

    private Long totalActivities;

    private Long completedActivities;

    private Long pendingActivities;

    private Long totalAccommodationBookings;

    private Long totalTransportationBookings;

    // Progress

    private Integer tripCompletionPercentage;

    // Dashboard Generated Time

    private LocalDateTime generatedAt;

}