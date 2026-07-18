package com.travelplanner.service;

import com.travelplanner.dto.DashboardResponseDto;
import com.travelplanner.dto.DashboardSummaryDto;

public interface DashboardService {

	DashboardResponseDto getTripDashboard(Long tripId);

	DashboardSummaryDto getDashboardSummary();
}