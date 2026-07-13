package com.travelplanner.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.travelplanner.dto.ExpenseRequestDto;
import com.travelplanner.dto.ExpenseResponseDto;
import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Trip;
import com.travelplanner.exception.ExpenseNotFoundException;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.mapper.ExpenseMapper;
import com.travelplanner.repo.ExpenseRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.service.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepo;
    private final TripRepository tripRepo;
    private final ExpenseMapper expenseMapper;

    public ExpenseServiceImpl(
            ExpenseRepository expenseRepo,
            TripRepository tripRepo,
            ExpenseMapper expenseMapper) {

        this.expenseRepo = expenseRepo;
        this.tripRepo = tripRepo;
        this.expenseMapper = expenseMapper;
    }

    @Override
    public ExpenseResponseDto createExpense(ExpenseRequestDto request) {

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + request.getTripId()));

        if(request.getExpenseDate().isBefore(trip.getStartDate())
                || request.getExpenseDate().isAfter(trip.getEndDate())) {

            throw new IllegalArgumentException(
                    "Expense Date must be within Trip Duration.");
        }

        Expense expense = expenseMapper.mapToExpense(request, trip);

        Expense savedExpense = expenseRepo.save(expense);

        return expenseMapper.mapToExpenseResponse(savedExpense);
    }

    @Override
    public ExpenseResponseDto getExpenseById(Long expenseId) {

        Expense expense = expenseRepo.findById(expenseId)
                .orElseThrow(() ->
                        new ExpenseNotFoundException(
                                "Expense not found with ID : "
                                        + expenseId));

        return expenseMapper.mapToExpenseResponse(expense);
    }

    @Override
    public List<ExpenseResponseDto> getAllExpenses() {

        return expenseRepo.findAll()
                .stream()
                .map(expenseMapper::mapToExpenseResponse)
                .toList();
    }

    @Override
    public List<ExpenseResponseDto> getExpensesByTrip(Long tripId) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + tripId));

        return expenseRepo.findByTrip(trip)
                .stream()
                .map(expenseMapper::mapToExpenseResponse)
                .toList();
    }

    @Override
    public ExpenseResponseDto updateExpense(
            Long expenseId,
            ExpenseRequestDto request) {

        Expense expense = expenseRepo.findById(expenseId)
                .orElseThrow(() ->
                        new ExpenseNotFoundException(
                                "Expense not found with ID : "
                                        + expenseId));

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + request.getTripId()));

        expense.setTrip(trip);
        expense.setExpenseTitle(request.getExpenseTitle());
        expense.setExpenseCategory(request.getExpenseCategory());
        expense.setAmount(request.getAmount());
        expense.setPaymentMethod(request.getPaymentMethod());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setNotes(request.getNotes());

        Expense updatedExpense = expenseRepo.save(expense);

        return expenseMapper.mapToExpenseResponse(updatedExpense);
    }

    @Override
    public void deleteExpense(Long expenseId) {

        Expense expense = expenseRepo.findById(expenseId)
                .orElseThrow(() ->
                        new ExpenseNotFoundException(
                                "Expense not found with ID : "
                                        + expenseId));

        expenseRepo.delete(expense);
    }

    @Override
    public Double getTotalExpenseByTrip(Long tripId) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + tripId));

        return expenseRepo.getTotalExpenseByTrip(trip);
    }

}