package com.travelplanner.report;

import java.util.List;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.report.BudgetAnalysisDto;
import com.travelplanner.entity.Accommodation;
import com.travelplanner.entity.Activity;
import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Transportation;

@Component
public class TripCostEstimator {

    public BudgetAnalysisDto calculateBudgetAnalysis(
            Double plannedBudget,
            List<Expense> expenses,
            List<Accommodation> accommodations,
            List<Transportation> transportations,
            List<Activity> activities) {

        double actualExpense = calculateActualExpense(expenses);

        double accommodationCost = calculateAccommodationCost(accommodations);

        double transportationCost = calculateTransportationCost(transportations);

        double activityEstimatedCost = calculateActivityEstimatedCost(activities);

        double estimatedCost =
                accommodationCost
                + transportationCost
                + activityEstimatedCost;

        double remainingBudget = plannedBudget - actualExpense;

        double utilization =
                plannedBudget > 0
                        ? (actualExpense / plannedBudget) * 100
                        : 0;

        String status =
                remainingBudget >= 0
                        ? "WITHIN BUDGET"
                        : "OVER BUDGET";

        return new BudgetAnalysisDto(
                plannedBudget,
                estimatedCost,
                actualExpense,
                remainingBudget,
                Math.round(utilization * 100.0) / 100.0,
                status);
    }

    public double calculateActualExpense(List<Expense> expenses) {

        return expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    public double calculateAccommodationCost(
            List<Accommodation> accommodations) {

        return accommodations.stream()
                .mapToDouble(Accommodation::getBookingAmount)
                .sum();
    }

    public double calculateTransportationCost(
            List<Transportation> transportations) {

        return transportations.stream()
                .mapToDouble(Transportation::getFare)
                .sum();
    }

    public double calculateActivityEstimatedCost(
            List<Activity> activities) {

        return activities.stream()
                .mapToDouble(Activity::getEstimatedCost)
                .sum();
    }

}