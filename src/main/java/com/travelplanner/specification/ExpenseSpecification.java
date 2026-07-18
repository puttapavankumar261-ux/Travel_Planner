package com.travelplanner.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.entity.Expense;
import com.travelplanner.enums.ExpenseCategory;
import com.travelplanner.enums.PaymentMethod;

import jakarta.persistence.criteria.Predicate;

public class ExpenseSpecification {

    private ExpenseSpecification() {
    }

    public static Specification<Expense> filterExpenses(
            String expenseTitle,
            ExpenseCategory expenseCategory,
            PaymentMethod paymentMethod,
            Double minAmount,
            Double maxAmount,
            LocalDate fromDate,
            LocalDate toDate) {

        return (root, query, criteriaBuilder) -> {

            Predicate predicate = criteriaBuilder.conjunction();

            // Filter by expense title (case-insensitive)
            if (expenseTitle != null && !expenseTitle.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("expenseTitle")),
                                "%" + expenseTitle.trim().toLowerCase() + "%"));
            }

            // Filter by expense category
            if (expenseCategory != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("expenseCategory"),
                                expenseCategory));
            }

            // Filter by payment method
            if (paymentMethod != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("paymentMethod"),
                                paymentMethod));
            }

            // Filter by minimum amount
            if (minAmount != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("amount"),
                                minAmount));
            }

            // Filter by maximum amount
            if (maxAmount != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("amount"),
                                maxAmount));
            }

            // Filter by expense date (From)
            if (fromDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("expenseDate"),
                                fromDate));
            }

            // Filter by expense date (To)
            if (toDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("expenseDate"),
                                toDate));
            }

            return predicate;
        };
    }
}