package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.DashboardResponseDto;
import com.travelplanner.dto.DashboardSummaryDto;
import com.travelplanner.dto.ExpenseCategoryDto;
import com.travelplanner.dto.MonthlyExpenseDto;
import com.travelplanner.dto.TripDestinationAnalyticsDto;
import com.travelplanner.dto.TripStatusAnalyticsDto;

public interface DashboardService {

    List<ExpenseCategoryDto> getExpenseCategoryAnalytics();

    List<MonthlyExpenseDto> getMonthlyExpenseAnalytics();

    List<TripStatusAnalyticsDto> getTripStatusAnalytics();

    List<TripDestinationAnalyticsDto> getTripDestinationAnalytics();

    DashboardResponseDto getTripDashboard(Long tripId);

    DashboardSummaryDto getDashboardSummary();
}