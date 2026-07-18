package com.travelplanner.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.entity.Activity;
import com.travelplanner.enums.ActivityCategory;
import com.travelplanner.enums.ActivityStatus;

import jakarta.persistence.criteria.Predicate;

public class ActivitySpecification {

    private ActivitySpecification() {
    }

    public static Specification<Activity> filterActivities(
            String activityName,
            ActivityCategory activityCategory,
            String location,
            ActivityStatus activityStatus,
            Boolean bookingRequired,
            Double minEstimatedCost,
            Double maxEstimatedCost,
            LocalDate activityDate) {

        return (root, query, criteriaBuilder) -> {

            Predicate predicate = criteriaBuilder.conjunction();

            // Filter by Activity Name
            if (activityName != null && !activityName.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("activityName")),
                                "%" + activityName.trim().toLowerCase() + "%"));
            }

            // Filter by Activity Category
            if (activityCategory != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("activityCategory"),
                                activityCategory));
            }

            // Filter by Location
            if (location != null && !location.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("location")),
                                "%" + location.trim().toLowerCase() + "%"));
            }

            // Filter by Activity Status
            if (activityStatus != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("activityStatus"),
                                activityStatus));
            }

            // Filter by Booking Required
            if (bookingRequired != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("bookingRequired"),
                                bookingRequired));
            }

            // Filter by Minimum Estimated Cost
            if (minEstimatedCost != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("estimatedCost"),
                                minEstimatedCost));
            }

            // Filter by Maximum Estimated Cost
            if (maxEstimatedCost != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("estimatedCost"),
                                maxEstimatedCost));
            }

            // Filter by Activity Date
            if (activityDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("activityDate"),
                                activityDate));
            }

            return predicate;
        };
    }
}