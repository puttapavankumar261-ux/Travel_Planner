package com.travelplanner.service;

import com.travelplanner.dto.DashboardResponseDto;

public interface DashboardService {

    DashboardResponseDto getTripDashboard(Long tripId);

}