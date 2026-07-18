package com.travelplanner.service.impl;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.util.PaginationUtil;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger =
            LoggerFactory.getLogger(AccommodationServiceImpl.class);

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

        logger.info("Creating accommodation for trip ID: {}", request.getTripId());

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : " + request.getTripId());
                });

        if (request.getCheckOutDate().isBefore(request.getCheckInDate())) {

            logger.warn("Invalid accommodation dates. Check-out date is before check-in date.");

            throw new IllegalArgumentException(
                    "Check Out Date cannot be before Check In Date.");
        }

        if (request.getCheckInDate().isBefore(trip.getStartDate())
                || request.getCheckInDate().isAfter(trip.getEndDate())) {

            logger.warn("Check-in date is outside trip duration.");

            throw new IllegalArgumentException(
                    "Check In Date must be within Trip Duration.");
        }

        if (request.getCheckOutDate().isBefore(trip.getStartDate())
                || request.getCheckOutDate().isAfter(trip.getEndDate())) {

            logger.warn("Check-out date is outside trip duration.");

            throw new IllegalArgumentException(
                    "Check Out Date must be within Trip Duration.");
        }

        Accommodation accommodation =
                accommodationMapper.mapToAccommodation(request, trip);

        accommodation.setBookingReference(
                "ACC-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase());

        Accommodation savedAccommodation =
                accommodationRepo.save(accommodation);

        logger.info("Accommodation created successfully with ID: {}",
                savedAccommodation.getAccommodationId());

        return accommodationMapper.mapToAccommodationResponse(savedAccommodation);
    }

    @Override
    public AccommodationResponseDto getAccommodationById(Long accommodationId) {

        logger.info("Fetching accommodation with ID: {}", accommodationId);

        Accommodation accommodation = accommodationRepo.findById(accommodationId)
                .orElseThrow(() -> {

                    logger.warn("Accommodation not found with ID: {}", accommodationId);

                    return new AccommodationNotFoundException(
                            "Accommodation not found with ID : " + accommodationId);
                });

        logger.info("Accommodation retrieved successfully with ID: {}", accommodationId);

        return accommodationMapper.mapToAccommodationResponse(accommodation);
    }

    @Override
    public PageResponseDto<AccommodationResponseDto> getAllAccommodations(
            int page,
            int size,
            String sortBy,
            String direction) {

        logger.info(
                "Fetching accommodations - Page: {}, Size: {}, SortBy: {}, Direction: {}",
                page, size, sortBy, direction);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Accommodation> accommodationPage = accommodationRepo.findAll(pageable);

        Page<AccommodationResponseDto> dtoPage =
                accommodationPage.map(accommodationMapper::mapToAccommodationResponse);

        logger.info(
                "Retrieved {} accommodation(s) on page {}.",
                dtoPage.getNumberOfElements(),
                dtoPage.getNumber());

        return PaginationUtil.build(dtoPage);
    }

    @Override
    public List<AccommodationResponseDto> getAccommodationsByTrip(Long tripId) {

        logger.info("Fetching accommodations for trip ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : " + tripId);
                });

        List<AccommodationResponseDto> accommodations =
                accommodationRepo.findByTrip(trip)
                        .stream()
                        .map(accommodationMapper::mapToAccommodationResponse)
                        .toList();

        logger.info("Retrieved {} accommodation(s) for trip ID: {}",
                accommodations.size(), tripId);

        return accommodations;
    }

    @Override
    public AccommodationResponseDto updateAccommodation(
            Long accommodationId,
            AccommodationRequestDto request) {

        logger.info("Updating accommodation with ID: {}", accommodationId);

        Accommodation accommodation = accommodationRepo.findById(accommodationId)
                .orElseThrow(() -> {

                    logger.warn("Accommodation not found with ID: {}", accommodationId);

                    return new AccommodationNotFoundException(
                            "Accommodation not found with ID : " + accommodationId);
                });

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : " + request.getTripId());
                });

        if (request.getCheckOutDate().isBefore(request.getCheckInDate())) {

            logger.warn("Invalid accommodation dates. Check-out date is before check-in date.");

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

        logger.info("Accommodation updated successfully with ID: {}",
                accommodationId);

        return accommodationMapper.mapToAccommodationResponse(updatedAccommodation);
    }

    @Override
    public void deleteAccommodation(Long accommodationId) {

        logger.info("Deleting accommodation with ID: {}", accommodationId);

        Accommodation accommodation = accommodationRepo.findById(accommodationId)
                .orElseThrow(() -> {

                    logger.warn("Accommodation not found with ID: {}", accommodationId);

                    return new AccommodationNotFoundException(
                            "Accommodation not found with ID : " + accommodationId);
                });

        accommodationRepo.delete(accommodation);

        logger.info("Accommodation deleted successfully with ID: {}",
                accommodationId);
    }

}