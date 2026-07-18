package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.ExpenseRequestDto;
import com.travelplanner.dto.ExpenseResponseDto;
import com.travelplanner.service.ExpenseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/expenses")
@Validated
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Create Expense
    @PostMapping
    public ResponseEntity<ApiResponse<ExpenseResponseDto>> createExpense(
            @Valid @RequestBody ExpenseRequestDto request) {

        ExpenseResponseDto response = expenseService.createExpense(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success(
                        ApiMessages.EXPENSE_CREATED,
                        response));
    }

    // Get Expense By ID
    @GetMapping("/{expenseId}")
    public ResponseEntity<ApiResponse<ExpenseResponseDto>> getExpenseById(
            @PathVariable Long expenseId) {

        ExpenseResponseDto response =
                expenseService.getExpenseById(expenseId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Expense Retrieved Successfully",
                        response));
    }

    // Get All Expenses
    @GetMapping
    public ResponseEntity<ApiResponse<List<ExpenseResponseDto>>> getAllExpenses() {

        List<ExpenseResponseDto> response =
                expenseService.getAllExpenses();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Expenses Retrieved Successfully",
                        response));
    }

    // Get Expenses By Trip
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<ApiResponse<List<ExpenseResponseDto>>> getExpensesByTrip(
            @PathVariable Long tripId) {

        List<ExpenseResponseDto> response =
                expenseService.getExpensesByTrip(tripId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Trip Expenses Retrieved Successfully",
                        response));
    }

    // Update Expense
    @PutMapping("/{expenseId}")
    public ResponseEntity<ApiResponse<ExpenseResponseDto>> updateExpense(
            @PathVariable Long expenseId,
            @Valid @RequestBody ExpenseRequestDto request) {

        ExpenseResponseDto response =
                expenseService.updateExpense(expenseId, request);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        ApiMessages.EXPENSE_UPDATED,
                        response));
    }

    // Delete Expense
    @DeleteMapping("/{expenseId}")
    public ResponseEntity<ApiResponse<String>> deleteExpense(
            @PathVariable Long expenseId) {

        expenseService.deleteExpense(expenseId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                       ApiMessages.EXPENSE_DELETED,
                        null));
    }

}