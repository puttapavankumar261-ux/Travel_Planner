package com.travelplanner.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.travelplanner.dto.TripRequestDto;
import com.travelplanner.dto.TripResponseDto;
import com.travelplanner.entity.Trip;
import com.travelplanner.entity.User;
import com.travelplanner.enums.TripStatus;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.exception.UserNotFoundException;
import com.travelplanner.mapper.TripMapper;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.TripService;

@Service
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepo;
    private final UserRepository userRepo;
    private final TripMapper tripMapper;

    public TripServiceImpl(
            TripRepository tripRepo,
            UserRepository userRepo,
            TripMapper tripMapper) {

        this.tripRepo = tripRepo;
        this.userRepo = userRepo;
        this.tripMapper = tripMapper;
    }

    @Override
    public TripResponseDto createTrip(TripRequestDto request) {

        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with ID : " + request.getUserId()));

        Trip trip = tripMapper.mapToTrip(request, user);

        Trip savedTrip = tripRepo.save(trip);

        return tripMapper.mapToTripResponse(savedTrip);
    }

    @Override
    public TripResponseDto getTripById(Long tripId) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + tripId));

        return tripMapper.mapToTripResponse(trip);
    }

    @Override
    public List<TripResponseDto> getAllTrips() {

        return tripRepo.findAll()
                .stream()
                .map(tripMapper::mapToTripResponse)
                .toList();
    }

    @Override
    public List<TripResponseDto> getTripsByUser(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with ID : " + userId));

        return tripRepo.findByUser(user)
                .stream()
                .map(tripMapper::mapToTripResponse)
                .toList();
    }

    @Override
    public List<TripResponseDto> getTripsByStatus(TripStatus tripStatus) {

        return tripRepo.findByTripStatus(tripStatus)
                .stream()
                .map(tripMapper::mapToTripResponse)
                .toList();
    }

    @Override
    public TripResponseDto updateTrip(Long tripId, TripRequestDto request) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + tripId));

        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with ID : " + request.getUserId()));

        trip.setTitle(request.getTitle());
        trip.setSource(request.getSource());
        trip.setDestination(request.getDestination());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setBudget(request.getBudget());
        trip.setDescription(request.getDescription());
        trip.setTripStatus(request.getTripStatus());
        trip.setUser(user);

        Trip updatedTrip = tripRepo.save(trip);

        return tripMapper.mapToTripResponse(updatedTrip);
    }

    @Override
    public void deleteTrip(Long tripId) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + tripId));

        tripRepo.delete(trip);
    }

}