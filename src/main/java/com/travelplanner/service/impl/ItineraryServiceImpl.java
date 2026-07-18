package com.travelplanner.service.impl;

import java.util.List;
import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.specification.ItinerarySpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.util.PaginationUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.travelplanner.dto.ItineraryRequestDto;
import com.travelplanner.dto.ItineraryResponseDto;
import com.travelplanner.entity.Itinerary;
import com.travelplanner.entity.Trip;
import com.travelplanner.exception.ItineraryNotFoundException;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.mapper.ItineraryMapper;
import com.travelplanner.repo.ItineraryRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.service.ItineraryService;

@Service
public class ItineraryServiceImpl implements ItineraryService {

    private static final Logger logger =
            LoggerFactory.getLogger(ItineraryServiceImpl.class);

    private final ItineraryRepository itineraryRepo;
    private final TripRepository tripRepo;
    private final ItineraryMapper itineraryMapper;

    public ItineraryServiceImpl(ItineraryRepository itineraryRepo,
                                TripRepository tripRepo,
                                ItineraryMapper itineraryMapper) {

        this.itineraryRepo = itineraryRepo;
        this.tripRepo = tripRepo;
        this.itineraryMapper = itineraryMapper;
    }

    @Override
    public ItineraryResponseDto createItinerary(ItineraryRequestDto request) {

        logger.info("Creating itinerary for trip ID: {}", request.getTripId());

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}",
                            request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : " + request.getTripId());
                });

        if (request.getEndTime().isBefore(request.getStartTime())) {

            logger.warn("Invalid itinerary time. End time is before start time.");

            throw new IllegalArgumentException(
                    "End Time cannot be before Start Time.");
        }

        if (request.getActivityDate().isBefore(trip.getStartDate())
                || request.getActivityDate().isAfter(trip.getEndDate())) {

            logger.warn("Activity date is outside trip duration.");

            throw new IllegalArgumentException(
                    "Activity Date must be within the Trip duration.");
        }

        Itinerary itinerary =
                itineraryMapper.mapToItinerary(request, trip);

        Itinerary saved =
                itineraryRepo.save(itinerary);

        logger.info("Itinerary created successfully with ID: {}",
                saved.getItineraryId());

        return itineraryMapper.mapToItineraryResponse(saved);
    }

    @Override
    public ItineraryResponseDto getItineraryById(Long itineraryId) {

        logger.info("Fetching itinerary with ID: {}", itineraryId);

        Itinerary itinerary = itineraryRepo.findById(itineraryId)
                .orElseThrow(() -> {

                    logger.warn("Itinerary not found with ID: {}",
                            itineraryId);

                    return new ItineraryNotFoundException(
                            "Itinerary not found with ID : " + itineraryId);
                });

        logger.info("Itinerary retrieved successfully with ID: {}",
                itineraryId);

        return itineraryMapper.mapToItineraryResponse(itinerary);
    }

    @Override
    public PageResponseDto<ItineraryResponseDto> getAllItineraries(
            int page,
            int size,
            String sortBy,
            String direction,
            Integer dayNumber,
            String activityTitle,
            String location,
            LocalDate activityDate) {

        logger.info(
                "Fetching itineraries with filters - Page: {}, Size: {}, SortBy: {}, Direction: {}, Day: {}, Activity: {}, Location: {}, Date: {}",
                page,
                size,
                sortBy,
                direction,
                dayNumber,
                activityTitle,
                location,
                activityDate);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Itinerary> specification =
                ItinerarySpecification.filterItineraries(
                        dayNumber,
                        activityTitle,
                        location,
                        activityDate);

        Page<Itinerary> itineraryPage =
                itineraryRepo.findAll(specification, pageable);

        Page<ItineraryResponseDto> dtoPage =
                itineraryPage.map(itineraryMapper::mapToItineraryResponse);

        logger.info(
                "Retrieved {} itinerary(s) on page {}.",
                dtoPage.getNumberOfElements(),
                dtoPage.getNumber());

        return PaginationUtil.build(dtoPage);
    }

    @Override
    public List<ItineraryResponseDto> getItinerariesByTrip(Long tripId) {

        logger.info("Fetching itineraries for trip ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : " + tripId);
                });

        List<ItineraryResponseDto> itineraries =
                itineraryRepo.findByTrip(trip)
                        .stream()
                        .map(itineraryMapper::mapToItineraryResponse)
                        .toList();

        logger.info("Retrieved {} itinerary(s) for trip ID: {}",
                itineraries.size(), tripId);

        return itineraries;
    }

    @Override
    public ItineraryResponseDto updateItinerary(Long itineraryId,
                                                ItineraryRequestDto request) {

        logger.info("Updating itinerary with ID: {}", itineraryId);

        Itinerary itinerary = itineraryRepo.findById(itineraryId)
                .orElseThrow(() -> {

                    logger.warn("Itinerary not found with ID: {}",
                            itineraryId);

                    return new ItineraryNotFoundException(
                            "Itinerary not found with ID : " + itineraryId);
                });

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}",
                            request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + request.getTripId());
                });

        if (request.getEndTime().isBefore(request.getStartTime())) {

            logger.warn("Invalid itinerary time. End time is before start time.");

            throw new IllegalArgumentException(
                    "End Time cannot be before Start Time.");
        }

        if (request.getActivityDate().isBefore(trip.getStartDate())
                || request.getActivityDate().isAfter(trip.getEndDate())) {

            logger.warn("Activity date is outside trip duration.");

            throw new IllegalArgumentException(
                    "Activity Date must be within the Trip duration.");
        }

        itinerary.setTrip(trip);
        itinerary.setDayNumber(request.getDayNumber());
        itinerary.setActivityTitle(request.getActivityTitle());
        itinerary.setLocation(request.getLocation());
        itinerary.setActivityDate(request.getActivityDate());
        itinerary.setStartTime(request.getStartTime());
        itinerary.setEndTime(request.getEndTime());
        itinerary.setNotes(request.getNotes());

        Itinerary updated =
                itineraryRepo.save(itinerary);

        logger.info("Itinerary updated successfully with ID: {}",
                itineraryId);

        return itineraryMapper.mapToItineraryResponse(updated);
    }

    @Override
    public void deleteItinerary(Long itineraryId) {

        logger.info("Deleting itinerary with ID: {}", itineraryId);

        Itinerary itinerary = itineraryRepo.findById(itineraryId)
                .orElseThrow(() -> {

                    logger.warn("Itinerary not found with ID: {}",
                            itineraryId);

                    return new ItineraryNotFoundException(
                            "Itinerary not found with ID : " + itineraryId);
                });

        itineraryRepo.delete(itinerary);

        logger.info("Itinerary deleted successfully with ID: {}",
                itineraryId);
    }

}