package com.travelplanner.service;

import java.time.LocalDate;
import java.util.List;

import com.travelplanner.dto.ExpenseRequestDto;
import com.travelplanner.dto.ExpenseResponseDto;
import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.enums.ExpenseCategory;
import com.travelplanner.enums.PaymentMethod;

public interface ExpenseService {

    ExpenseResponseDto createExpense(ExpenseRequestDto request);

    ExpenseResponseDto getExpenseById(Long expenseId);

    PageResponseDto<ExpenseResponseDto> getAllExpenses(
            int page,
            int size,
            String sortBy,
            String direction,
            String expenseTitle,
            ExpenseCategory expenseCategory,
            PaymentMethod paymentMethod,
            Double minAmount,
            Double maxAmount,
            LocalDate fromDate,
            LocalDate toDate);

    List<ExpenseResponseDto> getExpensesByTrip(Long tripId);

    ExpenseResponseDto updateExpense(
            Long expenseId,
            ExpenseRequestDto request);

    void deleteExpense(Long expenseId);

    Double getTotalExpenseByTrip(Long tripId);

}