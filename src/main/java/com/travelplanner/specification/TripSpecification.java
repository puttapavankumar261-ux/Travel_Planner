package com.travelplanner.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.entity.Trip;
import com.travelplanner.enums.TripStatus;

import jakarta.persistence.criteria.Predicate;

public class TripSpecification {

    private TripSpecification() {
    }

    public static Specification<Trip> filterTrips(
            String destination,
            TripStatus status,
            LocalDate startDate,
            LocalDate endDate,
            Double minBudget,
            Double maxBudget) {

        return (root, query, criteriaBuilder) -> {

            Predicate predicate = criteriaBuilder.conjunction();

            // Filter by destination (case-insensitive)
            if (destination != null && !destination.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("destination")),
                                "%" + destination.trim().toLowerCase() + "%"));
            }

            // Filter by trip status
            if (status != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(root.get("tripStatus"), status));
            }

            // Filter by start date
            if (startDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("startDate"),
                                startDate));
            }

            // Filter by end date
            if (endDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("endDate"),
                                endDate));
            }

            // Filter by minimum budget
            if (minBudget != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("budget"),
                                minBudget));
            }

            // Filter by maximum budget
            if (maxBudget != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("budget"),
                                maxBudget));
            }

            return predicate;
        };
    }
}