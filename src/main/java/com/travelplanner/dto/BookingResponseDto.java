package com.travelplanner.dto;

import java.time.LocalDateTime;

import com.travelplanner.enums.BookingStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingResponseDto {

    private Long bookingId;

    private String bookingReference;

    private Long userId;

    private String userName;

    private Long tripId;

    private String tripTitle;

    private Double amount;

    private BookingStatus bookingStatus;

    private String remarks;

    private LocalDateTime bookedAt;
}