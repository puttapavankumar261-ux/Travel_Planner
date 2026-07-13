package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.ExpenseRequestDto;
import com.travelplanner.dto.ExpenseResponseDto;

public interface ExpenseService {

    ExpenseResponseDto createExpense(ExpenseRequestDto request);

    ExpenseResponseDto getExpenseById(Long expenseId);

    List<ExpenseResponseDto> getAllExpenses();

    List<ExpenseResponseDto> getExpensesByTrip(Long tripId);

    ExpenseResponseDto updateExpense(Long expenseId,
                                     ExpenseRequestDto request);

    void deleteExpense(Long expenseId);

    Double getTotalExpenseByTrip(Long tripId);

}