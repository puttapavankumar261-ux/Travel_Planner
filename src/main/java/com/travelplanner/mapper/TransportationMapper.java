package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.TransportationRequestDto;
import com.travelplanner.dto.TransportationResponseDto;
import com.travelplanner.entity.Transportation;
import com.travelplanner.entity.Trip;

@Component
public class TransportationMapper {

    public Transportation mapToTransportation(
            TransportationRequestDto dto,
            Trip trip) {

        Transportation transportation = new Transportation();

        transportation.setTrip(trip);
        transportation.setTransportType(dto.getTransportType());
        transportation.setProviderName(dto.getProviderName());
        transportation.setSource(dto.getSource());
        transportation.setDestination(dto.getDestination());

        transportation.setDepartureDate(dto.getDepartureDate());
        transportation.setDepartureTime(dto.getDepartureTime());

        transportation.setArrivalDate(dto.getArrivalDate());
        transportation.setArrivalTime(dto.getArrivalTime());

        transportation.setTravelClass(dto.getTravelClass());

        transportation.setSeatNumber(dto.getSeatNumber());
        transportation.setTicketNumber(dto.getTicketNumber());

        // Generated in Service Layer
        transportation.setBookingReference(dto.getBookingReference());

        transportation.setTransportStatus(dto.getTransportStatus());
        transportation.setFare(dto.getFare());
        transportation.setNotes(dto.getNotes());

        return transportation;
    }

    public TransportationResponseDto mapToTransportationResponse(
            Transportation transportation) {

        TransportationResponseDto response =
                new TransportationResponseDto();

        response.setTransportationId(
                transportation.getTransportationId());

        response.setTripId(
                transportation.getTrip().getTripId());

        response.setTripTitle(
                transportation.getTrip().getTitle());

        response.setTransportType(
                transportation.getTransportType());

        response.setProviderName(
                transportation.getProviderName());

        response.setSource(
                transportation.getSource());

        response.setDestination(
                transportation.getDestination());

        response.setDepartureDate(
                transportation.getDepartureDate());

        response.setDepartureTime(
                transportation.getDepartureTime());

        response.setArrivalDate(
                transportation.getArrivalDate());

        response.setArrivalTime(
                transportation.getArrivalTime());

        response.setTravelClass(
                transportation.getTravelClass());

        response.setSeatNumber(
                transportation.getSeatNumber());

        response.setTicketNumber(
                transportation.getTicketNumber());

        response.setBookingReference(
                transportation.getBookingReference());

        response.setTransportStatus(
                transportation.getTransportStatus());

        response.setFare(
                transportation.getFare());

        response.setNotes(
                transportation.getNotes());

        response.setCreatedAt(
                transportation.getCreatedAt());

        response.setUpdatedAt(
                transportation.getUpdatedAt());

        return response;
    }

}