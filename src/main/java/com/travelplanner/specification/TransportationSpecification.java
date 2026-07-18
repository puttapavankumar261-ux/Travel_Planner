package com.travelplanner.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.entity.Transportation;
import com.travelplanner.enums.TransportStatus;
import com.travelplanner.enums.TransportType;
import com.travelplanner.enums.TravelClass;

import jakarta.persistence.criteria.Predicate;

public class TransportationSpecification {

    private TransportationSpecification() {
    }

    public static Specification<Transportation> filterTransportations(
            TransportType transportType,
            String providerName,
            String source,
            String destination,
            TravelClass travelClass,
            TransportStatus transportStatus,
            Double minFare,
            Double maxFare,
            LocalDate departureDate,
            LocalDate arrivalDate) {

        return (root, query, criteriaBuilder) -> {

            Predicate predicate = criteriaBuilder.conjunction();

            // Filter by Transport Type
            if (transportType != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("transportType"),
                                transportType));
            }

            // Filter by Provider Name
            if (providerName != null && !providerName.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("providerName")),
                                "%" + providerName.trim().toLowerCase() + "%"));
            }

            // Filter by Source
            if (source != null && !source.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("source")),
                                "%" + source.trim().toLowerCase() + "%"));
            }

            // Filter by Destination
            if (destination != null && !destination.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("destination")),
                                "%" + destination.trim().toLowerCase() + "%"));
            }

            // Filter by Travel Class
            if (travelClass != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("travelClass"),
                                travelClass));
            }

            // Filter by Transport Status
            if (transportStatus != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("transportStatus"),
                                transportStatus));
            }

            // Filter by Minimum Fare
            if (minFare != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("fare"),
                                minFare));
            }

            // Filter by Maximum Fare
            if (maxFare != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("fare"),
                                maxFare));
            }

            // Filter by Departure Date
            if (departureDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("departureDate"),
                                departureDate));
            }

            // Filter by Arrival Date
            if (arrivalDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("arrivalDate"),
                                arrivalDate));
            }

            return predicate;
        };
    }
}