package com.travelplanner.dto.report;

import java.time.LocalDate;
import java.util.List;

import com.travelplanner.enums.TripStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TripCompleteReportDto {

    // Trip Information
    private Long tripId;

    private String tripTitle;

    private String userName;

    private String source;

    private String destination;

    private LocalDate startDate;

    private LocalDate endDate;

    private String description;

    private TripStatus tripStatus;

    // Report Sections
    private BudgetAnalysisDto budgetAnalysis;

    private List<ExpenseSummaryDto> expenseSummary;
    
    private List<ExpenseReportDto> expenses;

    private List<AccommodationReportDto> accommodations;

    private List<TransportationReportDto> transportations;

    private List<ActivityReportDto> activities;

    private List<ItineraryReportDto> itineraries;

}