package com.travelplanner.dto;

import java.time.LocalDate;

import com.travelplanner.enums.ExpenseCategory;
import com.travelplanner.enums.PaymentMethod;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseRequestDto {

    @NotNull(message = "Trip ID is required")
    private Long tripId;

    @NotBlank(message = "Expense Title is required")
    private String expenseTitle;

    @NotNull(message = "Expense Category is required")
    private ExpenseCategory expenseCategory;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private Double amount;

    @NotNull(message = "Payment Method is required")
    private PaymentMethod paymentMethod;

    @NotNull(message = "Expense Date is required")
    @FutureOrPresent(message = "Expense Date cannot be in the past")
    private LocalDate expenseDate;

    private String notes;

}