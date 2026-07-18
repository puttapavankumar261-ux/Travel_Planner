package com.travelplanner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.dto.DashboardResponseDto;
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
                        "Dashboard Retrieved Successfully",
                        response));
    }

}