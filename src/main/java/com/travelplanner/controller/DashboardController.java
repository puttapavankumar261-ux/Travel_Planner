package com.travelplanner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.DashboardResponseDto;
import com.travelplanner.dto.DashboardSummaryDto;
import com.travelplanner.service.DashboardService;
import java.util.List;

import com.travelplanner.dto.ExpenseCategoryDto;
import com.travelplanner.dto.MonthlyExpenseDto;
import com.travelplanner.dto.TripDestinationAnalyticsDto;
import com.travelplanner.dto.TripStatusAnalyticsDto;
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<ApiResponse<DashboardResponseDto>> getDashboard(
            @PathVariable Long tripId) {

        DashboardResponseDto response =
                dashboardService.getTripDashboard(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.DASHBOARD_RETRIEVED,
                        response));
    }
    
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardSummaryDto>>
    getDashboardSummary() {

        DashboardSummaryDto response =
                dashboardService.getDashboardSummary();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.DASHBOARD_RETRIEVED,
                        response));
    }
    
    @GetMapping("/expense/category")
    public ResponseEntity<ApiResponse<List<ExpenseCategoryDto>>>
    getExpenseCategoryAnalytics() {

        List<ExpenseCategoryDto> response =
                dashboardService.getExpenseCategoryAnalytics();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.EXPENSE_CATEGORY_ANALYTICS_RETRIEVED,
                        response));
    }
    
    @GetMapping("/expense/monthly")
    public ResponseEntity<ApiResponse<List<MonthlyExpenseDto>>>
    getMonthlyExpenseAnalytics() {

        List<MonthlyExpenseDto> response =
                dashboardService.getMonthlyExpenseAnalytics();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.MONTHLY_EXPENSE_ANALYTICS_RETRIEVED,
                        response));
    }
    
    @GetMapping("/trip/status")
    public ResponseEntity<ApiResponse<List<TripStatusAnalyticsDto>>>
    getTripStatusAnalytics() {

        List<TripStatusAnalyticsDto> response =
                dashboardService.getTripStatusAnalytics();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRIP_STATUS_ANALYTICS_RETRIEVED,
                        response));
    }
    
    @GetMapping("/trip/destination")
    public ResponseEntity<ApiResponse<List<TripDestinationAnalyticsDto>>>
    getTripDestinationAnalytics() {

        List<TripDestinationAnalyticsDto> response =
                dashboardService.getTripDestinationAnalytics();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.TRIP_DESTINATION_ANALYTICS_RETRIEVED,
                        response));
    }

}