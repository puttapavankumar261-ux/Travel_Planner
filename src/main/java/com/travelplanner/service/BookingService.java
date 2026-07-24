package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.BookingRequestDto;
import com.travelplanner.dto.BookingResponseDto;

public interface BookingService {

    BookingResponseDto createBooking(BookingRequestDto bookingRequestDto);

    BookingResponseDto getBookingById(Long bookingId);

    List<BookingResponseDto> getMyBookings();
    
    List<BookingResponseDto> getAllBookings();

    void cancelBooking(Long bookingId);

}