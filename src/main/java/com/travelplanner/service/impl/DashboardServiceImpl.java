package com.travelplanner.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.travelplanner.dto.DashboardResponseDto;
import com.travelplanner.dto.DashboardSummaryDto;
import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Trip;
import com.travelplanner.enums.ActivityStatus;
import com.travelplanner.enums.TripStatus;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.repo.AccommodationRepository;
import com.travelplanner.repo.ActivityRepository;
import com.travelplanner.repo.ExpenseRepository;
import com.travelplanner.repo.ItineraryRepository;
import com.travelplanner.repo.TransportationRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    private static final Logger logger =
            LoggerFactory.getLogger(DashboardServiceImpl.class);

    private final TripRepository tripRepository;
    private final ExpenseRepository expenseRepository;
    private final ItineraryRepository itineraryRepository;
    private final ActivityRepository activityRepository;
    private final AccommodationRepository accommodationRepository;
    private final TransportationRepository transportationRepository;

    public DashboardServiceImpl(
            TripRepository tripRepository,
            ExpenseRepository expenseRepository,
            ItineraryRepository itineraryRepository,
            ActivityRepository activityRepository,
            AccommodationRepository accommodationRepository,
            TransportationRepository transportationRepository) {

        this.tripRepository = tripRepository;
        this.expenseRepository = expenseRepository;
        this.itineraryRepository = itineraryRepository;
        this.activityRepository = activityRepository;
        this.accommodationRepository = accommodationRepository;
        this.transportationRepository = transportationRepository;
    }

    @Override
    public DashboardResponseDto getTripDashboard(Long tripId) {

        logger.info("Generating dashboard for trip ID: {}", tripId);

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : " + tripId);
                });

        DashboardResponseDto dashboard = new DashboardResponseDto();

        // =====================================================
        // Trip Information
        // =====================================================

        dashboard.setTripId(trip.getTripId());
        dashboard.setTripTitle(trip.getTitle());
        dashboard.setDestination(trip.getDestination());
        dashboard.setStartDate(trip.getStartDate());
        dashboard.setEndDate(trip.getEndDate());
        dashboard.setTripStatus(trip.getTripStatus());
        dashboard.setTripBudget(trip.getBudget());

        // =====================================================
        // Expense Summary
        // =====================================================

        List<Expense> expenses = expenseRepository.findByTrip(trip);

        double totalExpenses = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        dashboard.setTotalExpenses(totalExpenses);
        dashboard.setRemainingBudget(
                trip.getBudget() - totalExpenses);

        // =====================================================
        // Statistics
        // =====================================================

        long totalItineraries =
                itineraryRepository.countByTrip(trip);

        dashboard.setTotalItineraries(totalItineraries);

        long totalActivities =
                activityRepository.countByTrip(trip);

        dashboard.setTotalActivities(totalActivities);

        long completedActivities =
                activityRepository.countByTripAndActivityStatus(
                        trip,
                        ActivityStatus.COMPLETED);

        dashboard.setCompletedActivities(completedActivities);

        long pendingActivities =
                totalActivities - completedActivities;

        dashboard.setPendingActivities(pendingActivities);

        long totalAccommodationBookings =
                accommodationRepository.countByTrip(trip);

        dashboard.setTotalAccommodationBookings(
                totalAccommodationBookings);

        long totalTransportationBookings =
                transportationRepository.countByTrip(trip);

        dashboard.setTotalTransportationBookings(
                totalTransportationBookings);

        // =====================================================
        // Progress Calculation
        // =====================================================

        int progress = 0;

        if (totalActivities > 0) {

            progress = (int) Math.round(
                    (completedActivities * 100.0)
                            / totalActivities);
        }

        dashboard.setTripCompletionPercentage(progress);

        // =====================================================
        // Dashboard Generated Time
        // =====================================================

        dashboard.setGeneratedAt(LocalDateTime.now());

        logger.info(
                "Dashboard generated successfully for trip ID: {} | Expenses: {} | Activities: {} | Progress: {}%",
                tripId,
                totalExpenses,
                totalActivities,
                progress);

        return dashboard;
    }
    
    @Override
    public DashboardSummaryDto getDashboardSummary() {

        logger.info("Generating dashboard summary.");

        DashboardSummaryDto dto = new DashboardSummaryDto();

        dto.setTotalTrips(tripRepository.count());

        dto.setUpcomingTrips(
                tripRepository.countByTripStatus(TripStatus.UPCOMING));

        dto.setOngoingTrips(
                tripRepository.countByTripStatus(TripStatus.ONGOING));

        dto.setCompletedTrips(
                tripRepository.countByTripStatus(TripStatus.COMPLETED));

        dto.setCancelledTrips(
                tripRepository.countByTripStatus(TripStatus.CANCELLED));

        dto.setTotalExpenses(
                expenseRepository.getTotalExpenses());

        dto.setTotalActivities(
                activityRepository.count());

        dto.setUpcomingActivities(
                activityRepository.countByActivityStatus(
                        ActivityStatus.PLANNED));

        dto.setCompletedActivities(
                activityRepository.countByActivityStatus(
                        ActivityStatus.COMPLETED));

        dto.setTotalAccommodations(
                accommodationRepository.count());

        dto.setTotalTransportations(
                transportationRepository.count());

        logger.info("Dashboard summary generated successfully.");

        return dto;
    }

}