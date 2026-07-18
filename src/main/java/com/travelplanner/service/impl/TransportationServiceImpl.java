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

import com.travelplanner.dto.TransportationRequestDto;
import com.travelplanner.dto.TransportationResponseDto;
import com.travelplanner.entity.Transportation;
import com.travelplanner.entity.Trip;
import com.travelplanner.exception.TransportNotFoundException;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.mapper.TransportationMapper;
import com.travelplanner.repo.TransportationRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.service.TransportationService;
import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.enums.TransportStatus;
import com.travelplanner.enums.TransportType;
import com.travelplanner.enums.TravelClass;
import com.travelplanner.specification.TransportationSpecification;
@Service
public class TransportationServiceImpl implements TransportationService {

    private static final Logger logger =
            LoggerFactory.getLogger(TransportationServiceImpl.class);

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

        logger.info("Creating transportation booking for trip ID: {}",
                request.getTripId());

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}",
                            request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + request.getTripId());
                });

        if (request.getArrivalDate().isBefore(request.getDepartureDate())) {

            logger.warn("Invalid transportation dates. Arrival date is before departure date.");

            throw new IllegalArgumentException(
                    "Arrival Date cannot be before Departure Date.");
        }

        if (request.getDepartureDate().isBefore(trip.getStartDate())
                || request.getDepartureDate().isAfter(trip.getEndDate())) {

            logger.warn("Departure date is outside trip duration.");

            throw new IllegalArgumentException(
                    "Departure Date must be within Trip Duration.");
        }

        if (request.getArrivalDate().isBefore(trip.getStartDate())
                || request.getArrivalDate().isAfter(trip.getEndDate())) {

            logger.warn("Arrival date is outside trip duration.");

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

        logger.info("Transportation created successfully with ID: {}",
                saved.getTransportationId());

        return transportationMapper.mapToTransportationResponse(saved);
    }

    @Override
    public TransportationResponseDto getTransportationById(
            Long transportationId) {

        logger.info("Fetching transportation with ID: {}", transportationId);

        Transportation transportation =
                transportationRepo.findById(transportationId)
                        .orElseThrow(() -> {

                            logger.warn("Transportation not found with ID: {}",
                                    transportationId);

                            return new TransportNotFoundException(
                                    "Transportation not found with ID : "
                                            + transportationId);
                        });

        logger.info("Transportation retrieved successfully with ID: {}",
                transportationId);

        return transportationMapper.mapToTransportationResponse(transportation);
    }

    @Override
    public PageResponseDto<TransportationResponseDto> getAllTransportations(
            int page,
            int size,
            String sortBy,
            String direction,
            TransportType transportType,
            String providerName,
            String source,
            String destination,
            TravelClass travelClass,
            TransportStatus transportStatus,
            Double minFare,
            Double maxFare,
            LocalDate departureDate,
            LocalDate arrivalDate) {

        logger.info(
                "Fetching transportation bookings with filters - Page: {}, Size: {}, SortBy: {}, Direction: {}, Type: {}, Provider: {}, Source: {}, Destination: {}, Class: {}, Status: {}",
                page,
                size,
                sortBy,
                direction,
                transportType,
                providerName,
                source,
                destination,
                travelClass,
                transportStatus);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Transportation> specification =
                TransportationSpecification.filterTransportations(
                        transportType,
                        providerName,
                        source,
                        destination,
                        travelClass,
                        transportStatus,
                        minFare,
                        maxFare,
                        departureDate,
                        arrivalDate);

        Page<Transportation> transportationPage =
                transportationRepo.findAll(specification, pageable);

        Page<TransportationResponseDto> dtoPage =
                transportationPage.map(
                        transportationMapper::mapToTransportationResponse);

        logger.info(
                "Retrieved {} transportation booking(s) on page {}.",
                dtoPage.getNumberOfElements(),
                dtoPage.getNumber());

        return PaginationUtil.build(dtoPage);
    }

    @Override
    public List<TransportationResponseDto> getTransportationsByTrip(
            Long tripId) {

        logger.info("Fetching transportation records for trip ID: {}",
                tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + tripId);
                });

        List<TransportationResponseDto> transportations =
                transportationRepo.findByTrip(trip)
                        .stream()
                        .map(transportationMapper::mapToTransportationResponse)
                        .toList();

        logger.info("Retrieved {} transportation record(s) for trip ID: {}",
                transportations.size(), tripId);

        return transportations;
    }

    @Override
    public TransportationResponseDto updateTransportation(
            Long transportationId,
            TransportationRequestDto request) {

        logger.info("Updating transportation with ID: {}",
                transportationId);

        Transportation transportation =
                transportationRepo.findById(transportationId)
                        .orElseThrow(() -> {

                            logger.warn("Transportation not found with ID: {}",
                                    transportationId);

                            return new TransportNotFoundException(
                                    "Transportation not found with ID : "
                                            + transportationId);
                        });

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}",
                            request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + request.getTripId());
                });

        if (request.getArrivalDate().isBefore(request.getDepartureDate())) {

            logger.warn("Invalid transportation dates. Arrival date is before departure date.");

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

        logger.info("Transportation updated successfully with ID: {}",
                transportationId);

        return transportationMapper.mapToTransportationResponse(updated);
    }

    @Override
    public void deleteTransportation(Long transportationId) {

        logger.info("Deleting transportation with ID: {}",
                transportationId);

        Transportation transportation =
                transportationRepo.findById(transportationId)
                        .orElseThrow(() -> {

                            logger.warn("Transportation not found with ID: {}",
                                    transportationId);

                            return new TransportNotFoundException(
                                    "Transportation not found with ID : "
                                            + transportationId);
                        });

        transportationRepo.delete(transportation);

        logger.info("Transportation deleted successfully with ID: {}",
                transportationId);
    }

}