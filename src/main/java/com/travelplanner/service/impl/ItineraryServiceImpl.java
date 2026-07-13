package com.travelplanner.service.impl;

import java.util.List;

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

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + request.getTripId()));

        // Business Validations
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException(
                    "End Time cannot be before Start Time.");
        }

        if (request.getActivityDate().isBefore(trip.getStartDate())
                || request.getActivityDate().isAfter(trip.getEndDate())) {

            throw new IllegalArgumentException(
                    "Activity Date must be within the Trip duration.");
        }

        Itinerary itinerary =
                itineraryMapper.mapToItinerary(request, trip);

        Itinerary saved =
                itineraryRepo.save(itinerary);

        return itineraryMapper.mapToItineraryResponse(saved);
    }

    @Override
    public ItineraryResponseDto getItineraryById(Long itineraryId) {

        Itinerary itinerary = itineraryRepo.findById(itineraryId)
                .orElseThrow(() ->
                        new ItineraryNotFoundException(
                                "Itinerary not found with ID : " + itineraryId));

        return itineraryMapper.mapToItineraryResponse(itinerary);
    }

    @Override
    public List<ItineraryResponseDto> getAllItineraries() {

        return itineraryRepo.findAll()
                .stream()
                .map(itineraryMapper::mapToItineraryResponse)
                .toList();
    }

    @Override
    public List<ItineraryResponseDto> getItinerariesByTrip(Long tripId) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + tripId));

        return itineraryRepo.findByTrip(trip)
                .stream()
                .map(itineraryMapper::mapToItineraryResponse)
                .toList();
    }

    @Override
    public ItineraryResponseDto updateItinerary(Long itineraryId,
                                                ItineraryRequestDto request) {

        Itinerary itinerary = itineraryRepo.findById(itineraryId)
                .orElseThrow(() ->
                        new ItineraryNotFoundException(
                                "Itinerary not found with ID : " + itineraryId));

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + request.getTripId()));

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException(
                    "End Time cannot be before Start Time.");
        }

        if (request.getActivityDate().isBefore(trip.getStartDate())
                || request.getActivityDate().isAfter(trip.getEndDate())) {

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

        return itineraryMapper.mapToItineraryResponse(updated);
    }

    @Override
    public void deleteItinerary(Long itineraryId) {

        Itinerary itinerary = itineraryRepo.findById(itineraryId)
                .orElseThrow(() ->
                        new ItineraryNotFoundException(
                                "Itinerary not found with ID : " + itineraryId));

        itineraryRepo.delete(itinerary);
    }

}