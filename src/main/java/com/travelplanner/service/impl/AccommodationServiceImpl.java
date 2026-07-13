package com.travelplanner.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.travelplanner.dto.AccommodationRequestDto;
import com.travelplanner.dto.AccommodationResponseDto;
import com.travelplanner.entity.Accommodation;
import com.travelplanner.entity.Trip;
import com.travelplanner.exception.AccommodationNotFoundException;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.mapper.AccommodationMapper;
import com.travelplanner.repo.AccommodationRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.service.AccommodationService;

@Service
public class AccommodationServiceImpl implements AccommodationService {

    private final AccommodationRepository accommodationRepo;
    private final TripRepository tripRepo;
    private final AccommodationMapper accommodationMapper;

    public AccommodationServiceImpl(
            AccommodationRepository accommodationRepo,
            TripRepository tripRepo,
            AccommodationMapper accommodationMapper) {

        this.accommodationRepo = accommodationRepo;
        this.tripRepo = tripRepo;
        this.accommodationMapper = accommodationMapper;
    }

    @Override
    public AccommodationResponseDto createAccommodation(AccommodationRequestDto request) {

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + request.getTripId()));

        // Business Validations

        if (request.getCheckOutDate().isBefore(request.getCheckInDate())) {
            throw new IllegalArgumentException(
                    "Check Out Date cannot be before Check In Date.");
        }

        if (request.getCheckInDate().isBefore(trip.getStartDate())
                || request.getCheckInDate().isAfter(trip.getEndDate())) {

            throw new IllegalArgumentException(
                    "Check In Date must be within Trip Duration.");
        }

        if (request.getCheckOutDate().isBefore(trip.getStartDate())
                || request.getCheckOutDate().isAfter(trip.getEndDate())) {

            throw new IllegalArgumentException(
                    "Check Out Date must be within Trip Duration.");
        }

        Accommodation accommodation =
                accommodationMapper.mapToAccommodation(request, trip);

        // Auto Generate Booking Reference
        accommodation.setBookingReference(
                "ACC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        Accommodation savedAccommodation =
                accommodationRepo.save(accommodation);

        return accommodationMapper.mapToAccommodationResponse(savedAccommodation);
    }

    @Override
    public AccommodationResponseDto getAccommodationById(Long accommodationId) {

        Accommodation accommodation = accommodationRepo.findById(accommodationId)
                .orElseThrow(() ->
                        new AccommodationNotFoundException(
                                "Accommodation not found with ID : " + accommodationId));

        return accommodationMapper.mapToAccommodationResponse(accommodation);
    }

    @Override
    public List<AccommodationResponseDto> getAllAccommodations() {

        return accommodationRepo.findAll()
                .stream()
                .map(accommodationMapper::mapToAccommodationResponse)
                .toList();
    }

    @Override
    public List<AccommodationResponseDto> getAccommodationsByTrip(Long tripId) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + tripId));

        return accommodationRepo.findByTrip(trip)
                .stream()
                .map(accommodationMapper::mapToAccommodationResponse)
                .toList();
    }

    @Override
    public AccommodationResponseDto updateAccommodation(
            Long accommodationId,
            AccommodationRequestDto request) {

        Accommodation accommodation = accommodationRepo.findById(accommodationId)
                .orElseThrow(() ->
                        new AccommodationNotFoundException(
                                "Accommodation not found with ID : " + accommodationId));

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + request.getTripId()));

        if (request.getCheckOutDate().isBefore(request.getCheckInDate())) {
            throw new IllegalArgumentException(
                    "Check Out Date cannot be before Check In Date.");
        }

        accommodation.setTrip(trip);
        accommodation.setHotelName(request.getHotelName());
        accommodation.setAccommodationType(request.getAccommodationType());
        accommodation.setHotelAddress(request.getHotelAddress());
        accommodation.setCity(request.getCity());
        accommodation.setCheckInDate(request.getCheckInDate());
        accommodation.setCheckOutDate(request.getCheckOutDate());
        accommodation.setRoomType(request.getRoomType());
        accommodation.setBookingStatus(request.getBookingStatus());
        accommodation.setBookingAmount(request.getBookingAmount());
        accommodation.setNotes(request.getNotes());

        Accommodation updatedAccommodation =
                accommodationRepo.save(accommodation);

        return accommodationMapper.mapToAccommodationResponse(updatedAccommodation);
    }

    @Override
    public void deleteAccommodation(Long accommodationId) {

        Accommodation accommodation = accommodationRepo.findById(accommodationId)
                .orElseThrow(() ->
                        new AccommodationNotFoundException(
                                "Accommodation not found with ID : " + accommodationId));

        accommodationRepo.delete(accommodation);
    }

}