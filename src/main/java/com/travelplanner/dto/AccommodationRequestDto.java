package com.travelplanner.dto;

import java.time.LocalDate;

import com.travelplanner.enums.AccommodationType;
import com.travelplanner.enums.BookingStatus;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationRequestDto {

    // Optional when creating via Trip Wizard - service sets this from the created trip
    private Long tripId;

    @NotBlank(message = "Hotel Name is required")
    private String hotelName;

    @NotNull(message = "Accommodation Type is required")
    private AccommodationType accommodationType;

    @NotBlank(message = "Hotel Address is required")
    private String hotelAddress;

    @NotBlank(message = "City is required")
    private String city;

    @NotNull(message = "Check In Date is required")
    private LocalDate checkInDate;

    @NotNull(message = "Check Out Date is required")
    private LocalDate checkOutDate;

    @NotBlank(message = "Room Type is required")
    private String roomType;

    /*
     * Auto generated in Service Layer.
     * User does not need to provide this.
     */
    private String bookingReference;

    @NotNull(message = "Booking Status is required")
    private BookingStatus bookingStatus;

    @NotNull(message = "Booking Amount is required")
    @Positive(message = "Booking Amount must be greater than zero")
    private Double bookingAmount;

    private String notes;

}