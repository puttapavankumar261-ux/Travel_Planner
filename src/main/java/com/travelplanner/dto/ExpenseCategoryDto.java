package com.travelplanner.dto;

import com.travelplanner.enums.ExpenseCategory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCategoryDto {

    private ExpenseCategory category;

    private Double totalAmount;

}