package com.travelplanner.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDto {

    // Trip Statistics
    private Long totalTrips;
    private Long upcomingTrips;
    private Long ongoingTrips;
    private Long completedTrips;
    private Long cancelledTrips;

    // Financial Statistics
    private Double totalExpenses;

    // Activity Statistics
    private Long totalActivities;
    private Long upcomingActivities;
    private Long completedActivities;

    // Booking Statistics
    private Long totalAccommodations;
    private Long totalTransportations;
}