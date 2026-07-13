package com.travelplanner.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.dto.DashboardResponseDto;
import com.travelplanner.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<DashboardResponseDto> getTripDashboard(
            @PathVariable Long tripId) {

        return ResponseEntity.ok(
                dashboardService.getTripDashboard(tripId));
    }

}