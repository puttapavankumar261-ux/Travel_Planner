package com.travelplanner.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.entity.Itinerary;

import jakarta.persistence.criteria.Predicate;

public class ItinerarySpecification {

    private ItinerarySpecification() {
    }

    public static Specification<Itinerary> filterItineraries(
            Integer dayNumber,
            String activityTitle,
            String location,
            LocalDate activityDate) {

        return (root, query, criteriaBuilder) -> {

            Predicate predicate = criteriaBuilder.conjunction();

            // Filter by Day Number
            if (dayNumber != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("dayNumber"),
                                dayNumber));
            }

            // Filter by Activity Title
            if (activityTitle != null && !activityTitle.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("activityTitle")),
                                "%" + activityTitle.trim().toLowerCase() + "%"));
            }

            // Filter by Location
            if (location != null && !location.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("location")),
                                "%" + location.trim().toLowerCase() + "%"));
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