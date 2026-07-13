package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.travelplanner.enums.TransportStatus;
import com.travelplanner.enums.TransportType;
import com.travelplanner.enums.TravelClass;

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
public class TransportationRequestDto {

    @NotNull(message = "Trip ID is required")
    private Long tripId;

    @NotNull(message = "Transport Type is required")
    private TransportType transportType;

    @NotBlank(message = "Provider Name is required")
    private String providerName;

    @NotBlank(message = "Source is required")
    private String source;

    @NotBlank(message = "Destination is required")
    private String destination;

    @NotNull(message = "Departure Date is required")
    @FutureOrPresent(message = "Departure Date cannot be in the past")
    private LocalDate departureDate;

    @NotNull(message = "Departure Time is required")
    private LocalTime departureTime;

    @NotNull(message = "Arrival Date is required")
    @FutureOrPresent(message = "Arrival Date cannot be in the past")
    private LocalDate arrivalDate;

    @NotNull(message = "Arrival Time is required")
    private LocalTime arrivalTime;

    @NotNull(message = "Travel Class is required")
    private TravelClass travelClass;

    private String seatNumber;

    private String ticketNumber;

    /*
     * Generated automatically in Service Layer
     */
    private String bookingReference;

    @NotNull(message = "Transport Status is required")
    private TransportStatus transportStatus;

    @NotNull(message = "Fare is required")
    @Positive(message = "Fare must be greater than zero")
    private Double fare;

    private String notes;

}