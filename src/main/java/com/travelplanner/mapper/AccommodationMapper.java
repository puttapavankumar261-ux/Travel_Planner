package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.AccommodationRequestDto;
import com.travelplanner.dto.AccommodationResponseDto;
import com.travelplanner.entity.Accommodation;
import com.travelplanner.entity.Trip;

@Component
public class AccommodationMapper {

    public Accommodation mapToAccommodation(
            AccommodationRequestDto dto,
            Trip trip) {

        Accommodation accommodation = new Accommodation();

        accommodation.setTrip(trip);
        accommodation.setHotelName(dto.getHotelName());
        accommodation.setAccommodationType(dto.getAccommodationType());
        accommodation.setHotelAddress(dto.getHotelAddress());
        accommodation.setCity(dto.getCity());
        accommodation.setCheckInDate(dto.getCheckInDate());
        accommodation.setCheckOutDate(dto.getCheckOutDate());
        accommodation.setRoomType(dto.getRoomType());

        // Booking Reference will be generated in Service Layer
        accommodation.setBookingReference(dto.getBookingReference());

        accommodation.setBookingStatus(dto.getBookingStatus());
        accommodation.setBookingAmount(dto.getBookingAmount());
        accommodation.setNotes(dto.getNotes());

        return accommodation;
    }

    public AccommodationResponseDto mapToAccommodationResponse(
            Accommodation accommodation) {

        AccommodationResponseDto response =
                new AccommodationResponseDto();

        response.setAccommodationId(accommodation.getAccommodationId());
        response.setTripId(accommodation.getTrip().getTripId());
        response.setTripTitle(accommodation.getTrip().getTitle());

        response.setHotelName(accommodation.getHotelName());
        response.setAccommodationType(accommodation.getAccommodationType());
        response.setHotelAddress(accommodation.getHotelAddress());
        response.setCity(accommodation.getCity());

        response.setCheckInDate(accommodation.getCheckInDate());
        response.setCheckOutDate(accommodation.getCheckOutDate());

        response.setRoomType(accommodation.getRoomType());
        response.setBookingReference(accommodation.getBookingReference());

        response.setBookingStatus(accommodation.getBookingStatus());
        response.setBookingAmount(accommodation.getBookingAmount());

        response.setNotes(accommodation.getNotes());

        response.setCreatedAt(accommodation.getCreatedAt());
        response.setUpdatedAt(accommodation.getUpdatedAt());

        return response;
    }

}