package com.travelplanner.dto.report;

import com.travelplanner.enums.ExpenseCategory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseSummaryDto {

    private ExpenseCategory category;

    private Double amount;

}