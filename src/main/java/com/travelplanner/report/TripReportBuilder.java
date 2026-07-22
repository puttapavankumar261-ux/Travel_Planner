package com.travelplanner.report;

import java.util.List;
import com.travelplanner.dto.report.ExpenseReportDto;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.report.AccommodationReportDto;
import com.travelplanner.dto.report.ActivityReportDto;
import com.travelplanner.dto.report.BudgetAnalysisDto;
import com.travelplanner.dto.report.ExpenseSummaryDto;
import com.travelplanner.dto.report.ItineraryReportDto;
import com.travelplanner.dto.report.TransportationReportDto;
import com.travelplanner.dto.report.TripCompleteReportDto;
import com.travelplanner.entity.Accommodation;
import com.travelplanner.entity.Activity;
import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Itinerary;
import com.travelplanner.entity.Transportation;
import com.travelplanner.entity.Trip;
import com.travelplanner.enums.ExpenseCategory;

@Component
public class TripReportBuilder {

    private final TripCostEstimator tripCostEstimator;

    public TripReportBuilder(TripCostEstimator tripCostEstimator) {
        this.tripCostEstimator = tripCostEstimator;
    }

    public TripCompleteReportDto buildReport(
            Trip trip,
            List<Expense> expenses,
            List<Activity> activities,
            List<Accommodation> accommodations,
            List<Transportation> transportations,
            List<Itinerary> itineraries) {

        BudgetAnalysisDto budgetAnalysis =
                tripCostEstimator.calculateBudgetAnalysis(
                        trip.getBudget(),
                        expenses,
                        accommodations,
                        transportations,
                        activities);

        return new TripCompleteReportDto(

                trip.getTripId(),
                trip.getTitle(),
                trip.getUser().getFirstName() + " " + trip.getUser().getLastName(),
                trip.getSource(),
                trip.getDestination(),
                trip.getStartDate(),
                trip.getEndDate(),
                trip.getDescription(),
                trip.getTripStatus(),

                budgetAnalysis,

                buildExpenseSummary(expenses),

                mapExpenses(expenses),

                mapAccommodations(accommodations),

                mapTransportations(transportations),

                mapActivities(activities),

                mapItineraries(itineraries)

        );
    }

    // =======================================================
    // Expense Summary
    // =======================================================

    private List<ExpenseSummaryDto> buildExpenseSummary(
            List<Expense> expenses) {

    	return List.of(
    	        buildCategory(expenses, ExpenseCategory.HOTEL),
    	        buildCategory(expenses, ExpenseCategory.TRANSPORT),
    	        buildCategory(expenses, ExpenseCategory.FOOD),
    	        buildCategory(expenses, ExpenseCategory.ENTERTAINMENT),
    	        buildCategory(expenses, ExpenseCategory.MEDICAL),
    	        buildCategory(expenses, ExpenseCategory.SHOPPING),
    	        buildCategory(expenses, ExpenseCategory.OTHER)
    	);
    }

    private ExpenseSummaryDto buildCategory(
            List<Expense> expenses,
            ExpenseCategory category) {

        double total = expenses.stream()
                .filter(e -> e.getExpenseCategory() == category)
                .mapToDouble(Expense::getAmount)
                .sum();

        return new ExpenseSummaryDto(category, total);
    }
    
 // =======================================================
 // Expense Details
 // =======================================================

 private List<ExpenseReportDto> mapExpenses(
         List<Expense> expenses) {

     return expenses.stream()

             .map(expense -> new ExpenseReportDto(

                     expense.getExpenseId(),

                     expense.getExpenseDate(),

                     expense.getExpenseTitle(),

                     expense.getExpenseCategory(),

                     expense.getAmount(),

                     expense.getPaymentMethod(),

                     expense.getNotes()

             ))

             .toList();
 }

    // =======================================================
    // Accommodation Mapping
    // =======================================================

    private List<AccommodationReportDto> mapAccommodations(
            List<Accommodation> accommodations) {

        return accommodations.stream()

                .map(a -> new AccommodationReportDto(

                        a.getHotelName(),
                        a.getAccommodationType(),
                        a.getHotelAddress(),
                        a.getCity(),
                        a.getCheckInDate(),
                        a.getCheckOutDate(),
                        a.getRoomType(),
                        a.getBookingStatus(),
                        a.getBookingAmount(),
                        a.getBookingReference()

                ))

                .toList();
    }

    // =======================================================
    // Transportation Mapping
    // =======================================================

    private List<TransportationReportDto> mapTransportations(
            List<Transportation> transportations) {

        return transportations.stream()

                .map(t -> new TransportationReportDto(

                        t.getTransportType(),
                        t.getProviderName(),
                        t.getSource(),
                        t.getDestination(),
                        t.getDepartureDate(),
                        t.getDepartureTime(),
                        t.getArrivalDate(),
                        t.getArrivalTime(),
                        t.getTravelClass(),
                        t.getSeatNumber(),
                        t.getTicketNumber(),
                        t.getFare(),
                        t.getTransportStatus()

                ))

                .toList();
    }

    // =======================================================
    // Activities
    // =======================================================

    private List<ActivityReportDto> mapActivities(
            List<Activity> activities) {

        return activities.stream()

                .map(a -> new ActivityReportDto(

                        a.getActivityName(),
                        a.getActivityCategory(),
                        a.getLocation(),
                        a.getActivityDate(),
                        a.getStartTime(),
                        a.getEndTime(),
                        a.getEstimatedCost(),
                        a.getBookingRequired(),
                        a.getActivityStatus()

                ))

                .toList();
    }

    // =======================================================
    // Itinerary
    // =======================================================

    private List<ItineraryReportDto> mapItineraries(
            List<Itinerary> itineraries) {

        return itineraries.stream()

                .map(i -> new ItineraryReportDto(

                        i.getDayNumber(),
                        i.getActivityTitle(),
                        i.getLocation(),
                        i.getActivityDate(),
                        i.getStartTime(),
                        i.getEndTime(),
                        i.getNotes()

                ))

                .toList();
    }

}