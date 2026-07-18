package com.travelplanner.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.entity.Accommodation;
import com.travelplanner.enums.AccommodationType;
import com.travelplanner.enums.BookingStatus;

import jakarta.persistence.criteria.Predicate;

public class AccommodationSpecification {

    private AccommodationSpecification() {
    }

    public static Specification<Accommodation> filterAccommodations(
            String hotelName,
            AccommodationType accommodationType,
            String city,
            BookingStatus bookingStatus,
            Double minBookingAmount,
            Double maxBookingAmount,
            LocalDate checkInDate,
            LocalDate checkOutDate) {

        return (root, query, criteriaBuilder) -> {

            Predicate predicate = criteriaBuilder.conjunction();

            // Filter by Hotel Name
            if (hotelName != null && !hotelName.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("hotelName")),
                                "%" + hotelName.trim().toLowerCase() + "%"));
            }

            // Filter by Accommodation Type
            if (accommodationType != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("accommodationType"),
                                accommodationType));
            }

            // Filter by City
            if (city != null && !city.trim().isEmpty()) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("city")),
                                "%" + city.trim().toLowerCase() + "%"));
            }

            // Filter by Booking Status
            if (bookingStatus != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("bookingStatus"),
                                bookingStatus));
            }

            // Filter by Minimum Booking Amount
            if (minBookingAmount != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("bookingAmount"),
                                minBookingAmount));
            }

            // Filter by Maximum Booking Amount
            if (maxBookingAmount != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("bookingAmount"),
                                maxBookingAmount));
            }

            // Filter by Check-In Date
            if (checkInDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("checkInDate"),
                                checkInDate));
            }

            // Filter by Check-Out Date
            if (checkOutDate != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                root.get("checkOutDate"),
                                checkOutDate));
            }

            return predicate;
        };
    }
}