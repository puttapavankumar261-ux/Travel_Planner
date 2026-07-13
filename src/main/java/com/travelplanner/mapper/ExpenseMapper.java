package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.ExpenseRequestDto;
import com.travelplanner.dto.ExpenseResponseDto;
import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Trip;

@Component
public class ExpenseMapper {

    public Expense mapToExpense(ExpenseRequestDto dto, Trip trip) {

        Expense expense = new Expense();

        expense.setTrip(trip);
        expense.setExpenseTitle(dto.getExpenseTitle());
        expense.setExpenseCategory(dto.getExpenseCategory());
        expense.setAmount(dto.getAmount());
        expense.setPaymentMethod(dto.getPaymentMethod());
        expense.setExpenseDate(dto.getExpenseDate());
        expense.setNotes(dto.getNotes());

        return expense;
    }

    public ExpenseResponseDto mapToExpenseResponse(Expense expense) {

        ExpenseResponseDto response = new ExpenseResponseDto();

        response.setExpenseId(expense.getExpenseId());
        response.setTripId(expense.getTrip().getTripId());
        response.setTripTitle(expense.getTrip().getTitle());
        response.setExpenseTitle(expense.getExpenseTitle());
        response.setExpenseCategory(expense.getExpenseCategory());
        response.setAmount(expense.getAmount());
        response.setPaymentMethod(expense.getPaymentMethod());
        response.setExpenseDate(expense.getExpenseDate());
        response.setNotes(expense.getNotes());
        response.setCreatedAt(expense.getCreatedAt());
        response.setUpdatedAt(expense.getUpdatedAt());

        return response;
    }

}