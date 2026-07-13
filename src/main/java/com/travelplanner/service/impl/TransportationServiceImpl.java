package com.travelplanner.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.travelplanner.dto.TransportationRequestDto;
import com.travelplanner.dto.TransportationResponseDto;
import com.travelplanner.entity.Transportation;
import com.travelplanner.entity.Trip;
import com.travelplanner.exception.TransportNotFoundException;
import com.travelplanner.exception.TransportNotFoundException;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.mapper.TransportationMapper;
import com.travelplanner.repo.TransportationRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.service.TransportationService;

@Service
public class TransportationServiceImpl implements TransportationService {

    private final TransportationRepository transportationRepo;
    private final TripRepository tripRepo;
    private final TransportationMapper transportationMapper;

    public TransportationServiceImpl(
            TransportationRepository transportationRepo,
            TripRepository tripRepo,
            TransportationMapper transportationMapper) {

        this.transportationRepo = transportationRepo;
        this.tripRepo = tripRepo;
        this.transportationMapper = transportationMapper;
    }

    @Override
    public TransportationResponseDto createTransportation(
            TransportationRequestDto request) {

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + request.getTripId()));

        if (request.getArrivalDate().isBefore(request.getDepartureDate())) {
            throw new IllegalArgumentException(
                    "Arrival Date cannot be before Departure Date.");
        }

        if (request.getDepartureDate().isBefore(trip.getStartDate())
                || request.getDepartureDate().isAfter(trip.getEndDate())) {

            throw new IllegalArgumentException(
                    "Departure Date must be within Trip Duration.");
        }

        if (request.getArrivalDate().isBefore(trip.getStartDate())
                || request.getArrivalDate().isAfter(trip.getEndDate())) {

            throw new IllegalArgumentException(
                    "Arrival Date must be within Trip Duration.");
        }

        Transportation transportation =
                transportationMapper.mapToTransportation(request, trip);

        transportation.setBookingReference(
                "TRN-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase());

        Transportation saved =
                transportationRepo.save(transportation);

        return transportationMapper.mapToTransportationResponse(saved);
    }

    @Override
    public TransportationResponseDto getTransportationById(
            Long transportationId) {

        Transportation transportation =
                transportationRepo.findById(transportationId)
                .orElseThrow(() ->
                        new TransportNotFoundException(
                                "Transportation not found with ID : "
                                        + transportationId));

        return transportationMapper
                .mapToTransportationResponse(transportation);
    }

    @Override
    public List<TransportationResponseDto> getAllTransportations() {

        return transportationRepo.findAll()
                .stream()
                .map(transportationMapper::mapToTransportationResponse)
                .toList();
    }

    @Override
    public List<TransportationResponseDto> getTransportationsByTrip(
            Long tripId) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + tripId));

        return transportationRepo.findByTrip(trip)
                .stream()
                .map(transportationMapper::mapToTransportationResponse)
                .toList();
    }

    @Override
    public TransportationResponseDto updateTransportation(
            Long transportationId,
            TransportationRequestDto request) {

        Transportation transportation =
                transportationRepo.findById(transportationId)
                .orElseThrow(() ->
                        new TransportNotFoundException(
                                "Transportation not found with ID : "
                                        + transportationId));

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + request.getTripId()));

        if (request.getArrivalDate().isBefore(request.getDepartureDate())) {
            throw new IllegalArgumentException(
                    "Arrival Date cannot be before Departure Date.");
        }

        transportation.setTrip(trip);
        transportation.setTransportType(request.getTransportType());
        transportation.setProviderName(request.getProviderName());
        transportation.setSource(request.getSource());
        transportation.setDestination(request.getDestination());
        transportation.setDepartureDate(request.getDepartureDate());
        transportation.setDepartureTime(request.getDepartureTime());
        transportation.setArrivalDate(request.getArrivalDate());
        transportation.setArrivalTime(request.getArrivalTime());
        transportation.setTravelClass(request.getTravelClass());
        transportation.setSeatNumber(request.getSeatNumber());
        transportation.setTicketNumber(request.getTicketNumber());
        transportation.setTransportStatus(request.getTransportStatus());
        transportation.setFare(request.getFare());
        transportation.setNotes(request.getNotes());

        Transportation updated =
                transportationRepo.save(transportation);

        return transportationMapper
                .mapToTransportationResponse(updated);
    }

    @Override
    public void deleteTransportation(Long transportationId) {

        Transportation transportation =
                transportationRepo.findById(transportationId)
                .orElseThrow(() ->
                        new TransportNotFoundException(
                                "Transportation not found with ID : "
                                        + transportationId));

        transportationRepo.delete(transportation);
    }

}