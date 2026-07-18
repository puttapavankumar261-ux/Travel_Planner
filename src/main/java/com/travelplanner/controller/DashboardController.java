package com.travelplanner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.DashboardResponseDto;
import com.travelplanner.dto.DashboardSummaryDto;
import com.travelplanner.service.DashboardService;

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

}