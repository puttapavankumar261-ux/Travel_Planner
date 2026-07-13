package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
public class ExpenseResponseDto {

    private Long expenseId;

    private Long tripId;

    private String tripTitle;

    private String expenseTitle;

    private ExpenseCategory expenseCategory;

    private Double amount;

    private PaymentMethod paymentMethod;

    private LocalDate expenseDate;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}