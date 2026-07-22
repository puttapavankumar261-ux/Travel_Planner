package com.travelplanner.dto.report;

import java.time.LocalDate;

import com.travelplanner.enums.ExpenseCategory;
import com.travelplanner.enums.PaymentMethod;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseReportDto {

    private Long expenseId;

    private LocalDate expenseDate;

    private String expenseTitle;

    private ExpenseCategory category;

    private Double amount;

    private PaymentMethod paymentMethod;

    private String notes;

}