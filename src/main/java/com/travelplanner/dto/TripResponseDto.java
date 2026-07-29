package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.travelplanner.enums.TripStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TripResponseDto {

    private Long tripId;

    private String title;
    
    private String source;

    private String destination;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double budget;

    private String description;

    private String travelerName;

    private String tripType;

    private TripStatus tripStatus;

    private Long userId;

    private String userName;

    private String userEmail;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<AccommodationResponseDto> accommodations;

    private List<TransportationResponseDto> transportations;

    private List<BookingResponseDto> bookings;
}