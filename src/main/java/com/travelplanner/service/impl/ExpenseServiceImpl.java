package com.travelplanner.service.impl;

import java.util.List;
import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.enums.ExpenseCategory;
import com.travelplanner.enums.PaymentMethod;
import com.travelplanner.specification.ExpenseSpecification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.util.PaginationUtil;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private static final Logger logger =
            LoggerFactory.getLogger(ExpenseServiceImpl.class);

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

        logger.info("Creating expense for trip ID: {}", request.getTripId());

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + request.getTripId());
                });

        if (request.getExpenseDate().isBefore(trip.getStartDate())
                || request.getExpenseDate().isAfter(trip.getEndDate())) {

            logger.warn("Expense date is outside trip duration.");

            throw new IllegalArgumentException(
                    "Expense Date must be within Trip Duration.");
        }

        Expense expense = expenseMapper.mapToExpense(request, trip);

        Expense savedExpense = expenseRepo.save(expense);

        logger.info("Expense created successfully with ID: {}",
                savedExpense.getExpenseId());

        return expenseMapper.mapToExpenseResponse(savedExpense);
    }

    @Override
    public ExpenseResponseDto getExpenseById(Long expenseId) {

        logger.info("Fetching expense with ID: {}", expenseId);

        Expense expense = expenseRepo.findById(expenseId)
                .orElseThrow(() -> {

                    logger.warn("Expense not found with ID: {}", expenseId);

                    return new ExpenseNotFoundException(
                            "Expense not found with ID : "
                                    + expenseId);
                });

        logger.info("Expense retrieved successfully with ID: {}", expenseId);

        return expenseMapper.mapToExpenseResponse(expense);
    }

    @Override
    public PageResponseDto<ExpenseResponseDto> getAllExpenses(
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
            LocalDate toDate) {

        logger.info(
                "Fetching expenses with filters - Page: {}, Size: {}, SortBy: {}, Direction: {}, Title: {}, Category: {}, PaymentMethod: {}",
                page,
                size,
                sortBy,
                direction,
                expenseTitle,
                expenseCategory,
                paymentMethod);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Expense> specification =
                ExpenseSpecification.filterExpenses(
                        expenseTitle,
                        expenseCategory,
                        paymentMethod,
                        minAmount,
                        maxAmount,
                        fromDate,
                        toDate);

        Page<Expense> expensePage =
                expenseRepo.findAll(specification, pageable);

        Page<ExpenseResponseDto> dtoPage =
                expensePage.map(expenseMapper::mapToExpenseResponse);

        logger.info(
                "Retrieved {} expense(s) on page {}.",
                dtoPage.getNumberOfElements(),
                dtoPage.getNumber());

        return PaginationUtil.build(dtoPage);
    }

    @Override
    public List<ExpenseResponseDto> getExpensesByTrip(Long tripId) {

        logger.info("Fetching expenses for trip ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + tripId);
                });

        List<ExpenseResponseDto> expenses = expenseRepo.findByTrip(trip)
                .stream()
                .map(expenseMapper::mapToExpenseResponse)
                .toList();

        logger.info("Retrieved {} expense(s) for trip ID: {}",
                expenses.size(), tripId);

        return expenses;
    }

    @Override
    public ExpenseResponseDto updateExpense(
            Long expenseId,
            ExpenseRequestDto request) {

        logger.info("Updating expense with ID: {}", expenseId);

        Expense expense = expenseRepo.findById(expenseId)
                .orElseThrow(() -> {

                    logger.warn("Expense not found with ID: {}", expenseId);

                    return new ExpenseNotFoundException(
                            "Expense not found with ID : "
                                    + expenseId);
                });

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + request.getTripId());
                });

        expense.setTrip(trip);
        expense.setExpenseTitle(request.getExpenseTitle());
        expense.setExpenseCategory(request.getExpenseCategory());
        expense.setAmount(request.getAmount());
        expense.setPaymentMethod(request.getPaymentMethod());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setNotes(request.getNotes());

        Expense updatedExpense = expenseRepo.save(expense);

        logger.info("Expense updated successfully with ID: {}", expenseId);

        return expenseMapper.mapToExpenseResponse(updatedExpense);
    }

    @Override
    public void deleteExpense(Long expenseId) {

        logger.info("Deleting expense with ID: {}", expenseId);

        Expense expense = expenseRepo.findById(expenseId)
                .orElseThrow(() -> {

                    logger.warn("Expense not found with ID: {}", expenseId);

                    return new ExpenseNotFoundException(
                            "Expense not found with ID : "
                                    + expenseId);
                });

        expenseRepo.delete(expense);

        logger.info("Expense deleted successfully with ID: {}", expenseId);
    }

    @Override
    public Double getTotalExpenseByTrip(Long tripId) {

        logger.info("Calculating total expense for trip ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + tripId);
                });

        Double totalExpense = expenseRepo.getTotalExpenseByTrip(trip);

        logger.info("Total expense for trip ID {} is {}",
                tripId, totalExpense);

        return totalExpense;
    }

}