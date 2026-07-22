package com.travelplanner.dto.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudgetAnalysisDto {

    private Double plannedBudget;

    private Double estimatedCost;

    private Double actualExpense;

    private Double remainingBudget;

    private Double budgetUtilization;

    private String budgetStatus;

}