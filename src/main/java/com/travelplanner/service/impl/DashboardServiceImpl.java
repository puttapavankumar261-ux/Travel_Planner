package com.travelplanner.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.travelplanner.dto.DashboardResponseDto;
import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Trip;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.repo.AccommodationRepository;
import com.travelplanner.repo.ActivityRepository;
import com.travelplanner.repo.ExpenseRepository;
import com.travelplanner.repo.ItineraryRepository;
import com.travelplanner.repo.TransportationRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.enums.ActivityStatus;
import com.travelplanner.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

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

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + tripId));

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

        return dashboard;
    }

}