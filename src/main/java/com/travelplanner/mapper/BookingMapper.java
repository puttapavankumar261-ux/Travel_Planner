package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.BookingResponseDto;
import com.travelplanner.entity.Booking;

@Component
public class BookingMapper {

    public BookingResponseDto toResponseDto(Booking booking) {

        BookingResponseDto dto = new BookingResponseDto();

        dto.setBookingId(booking.getBookingId());
        dto.setBookingReference(booking.getBookingReference());

        dto.setUserId(booking.getUser().getUserId());
        dto.setUserName(booking.getUser().getFirstName() + " " + booking.getUser().getLastName());

        dto.setTripId(booking.getTrip().getTripId());
        dto.setTripTitle(booking.getTrip().getTitle());

        dto.setAmount(booking.getAmount());
        dto.setBookingStatus(booking.getBookingStatus());
        dto.setRemarks(booking.getRemarks());
        dto.setBookedAt(booking.getBookedAt());

        return dto;
    }
}