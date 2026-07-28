package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.TripRequestDto;
import com.travelplanner.dto.TripResponseDto;
import com.travelplanner.entity.Trip;
import com.travelplanner.entity.User;
import java.util.stream.Collectors;

@Component
public class TripMapper {

    private final AccommodationMapper accommodationMapper;
    private final TransportationMapper transportationMapper;
    private final BookingMapper bookingMapper;

    public TripMapper(AccommodationMapper accommodationMapper, TransportationMapper transportationMapper, BookingMapper bookingMapper) {
        this.accommodationMapper = accommodationMapper;
        this.transportationMapper = transportationMapper;
        this.bookingMapper = bookingMapper;
    }

    public Trip mapToTrip(TripRequestDto dto, User user) {

        Trip trip = new Trip();

        trip.setTitle(dto.getTitle());
        trip.setSource(dto.getSource());
        trip.setDestination(dto.getDestination());
        trip.setStartDate(dto.getStartDate());
        trip.setEndDate(dto.getEndDate());
        trip.setBudget(dto.getBudget());
        trip.setDescription(dto.getDescription());
        trip.setTravelerName(dto.getTravelerName());
        trip.setTripType(dto.getTripType());
        trip.setTripStatus(dto.getTripStatus());
        trip.setUser(user);

        return trip;
    }

    public TripResponseDto mapToTripResponse(Trip trip) {

        TripResponseDto response = new TripResponseDto();

        response.setTripId(trip.getTripId());
        response.setTitle(trip.getTitle());
        response.setSource(trip.getSource());
        response.setDestination(trip.getDestination());
        response.setStartDate(trip.getStartDate());
        response.setEndDate(trip.getEndDate());
        response.setBudget(trip.getBudget());
        response.setDescription(trip.getDescription());
        response.setTravelerName(trip.getTravelerName());
        response.setTripType(trip.getTripType());
        response.setTripStatus(trip.getTripStatus());

        response.setUserId(trip.getUser().getUserId());

        response.setUserName(
                trip.getUser().getFirstName() + " " +
                trip.getUser().getLastName()
        );

        response.setCreatedAt(trip.getCreatedAt());
        response.setUpdatedAt(trip.getUpdatedAt());

        if (trip.getAccommodations() != null) {
            response.setAccommodations(trip.getAccommodations().stream()
                    .map(accommodationMapper::mapToAccommodationResponse)
                    .collect(Collectors.toList()));
        }

        if (trip.getTransportations() != null) {
            response.setTransportations(trip.getTransportations().stream()
                    .map(transportationMapper::mapToTransportationResponse)
                    .collect(Collectors.toList()));
        }

        if (trip.getBookings() != null) {
            response.setBookings(trip.getBookings().stream()
                    .map(bookingMapper::toResponseDto)
                    .collect(Collectors.toList()));
        }

        return response;
    }

}