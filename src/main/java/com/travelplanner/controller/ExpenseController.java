package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<ExpenseResponseDto> createExpense(
            @Valid @RequestBody ExpenseRequestDto request) {

        return new ResponseEntity<>(
                expenseService.createExpense(request),
                HttpStatus.CREATED);
    }

    @GetMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponseDto> getExpenseById(
            @PathVariable Long expenseId) {

        return ResponseEntity.ok(
                expenseService.getExpenseById(expenseId));
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponseDto>> getAllExpenses() {

        return ResponseEntity.ok(
                expenseService.getAllExpenses());
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<ExpenseResponseDto>> getExpensesByTrip(
            @PathVariable Long tripId) {

        return ResponseEntity.ok(
                expenseService.getExpensesByTrip(tripId));
    }

    @GetMapping("/trip/{tripId}/total")
    public ResponseEntity<Double> getTotalExpenseByTrip(
            @PathVariable Long tripId) {

        return ResponseEntity.ok(
                expenseService.getTotalExpenseByTrip(tripId));
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponseDto> updateExpense(
            @PathVariable Long expenseId,
            @Valid @RequestBody ExpenseRequestDto request) {

        return ResponseEntity.ok(
                expenseService.updateExpense(expenseId, request));
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<String> deleteExpense(
            @PathVariable Long expenseId) {

        expenseService.deleteExpense(expenseId);

        return ResponseEntity.ok(
                "Expense deleted successfully.");
    }

}