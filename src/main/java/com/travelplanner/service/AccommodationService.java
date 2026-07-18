package com.travelplanner.service;

import java.time.LocalDate;
import java.util.List;

import com.travelplanner.dto.AccommodationRequestDto;
import com.travelplanner.dto.AccommodationResponseDto;
import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.enums.AccommodationType;
import com.travelplanner.enums.BookingStatus;

public interface AccommodationService {

    AccommodationResponseDto createAccommodation(AccommodationRequestDto request);

    AccommodationResponseDto getAccommodationById(Long accommodationId);

    PageResponseDto<AccommodationResponseDto> getAllAccommodations(
            int page,
            int size,
            String sortBy,
            String direction,
            String hotelName,
            AccommodationType accommodationType,
            String city,
            BookingStatus bookingStatus,
            Double minBookingAmount,
            Double maxBookingAmount,
            LocalDate checkInDate,
            LocalDate checkOutDate);

    List<AccommodationResponseDto> getAccommodationsByTrip(Long tripId);

    AccommodationResponseDto updateAccommodation(
            Long accommodationId,
            AccommodationRequestDto request);

    void deleteAccommodation(Long accommodationId);

}