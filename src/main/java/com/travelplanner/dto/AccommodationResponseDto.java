package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.travelplanner.enums.AccommodationType;
import com.travelplanner.enums.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationResponseDto {

    private Long accommodationId;

    private Long tripId;

    private String tripTitle;

    private String hotelName;

    private AccommodationType accommodationType;

    private String hotelAddress;

    private String city;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private String roomType;

    private String bookingReference;

    private BookingStatus bookingStatus;

    private Double bookingAmount;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}