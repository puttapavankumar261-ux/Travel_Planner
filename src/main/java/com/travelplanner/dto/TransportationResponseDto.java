package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.travelplanner.enums.TransportStatus;
import com.travelplanner.enums.TransportType;
import com.travelplanner.enums.TravelClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransportationResponseDto {

    private Long transportationId;

    private Long tripId;

    private String tripTitle;

    private TransportType transportType;

    private String providerName;

    private String source;

    private String destination;

    private LocalDate departureDate;

    private LocalTime departureTime;

    private LocalDate arrivalDate;

    private LocalTime arrivalTime;

    private TravelClass travelClass;

    private String seatNumber;

    private String ticketNumber;

    private String bookingReference;

    private TransportStatus transportStatus;

    private Double fare;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}