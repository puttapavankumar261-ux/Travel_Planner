package com.travelplanner.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.travelplanner.dto.ActivityRequestDto;
import com.travelplanner.dto.ActivityResponseDto;
import com.travelplanner.entity.Activity;
import com.travelplanner.entity.Trip;
import com.travelplanner.exception.ActivityNotFoundException;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.mapper.ActivityMapper;
import com.travelplanner.repo.ActivityRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.service.ActivityService;

@Service
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepo;
    private final TripRepository tripRepo;
    private final ActivityMapper activityMapper;

    public ActivityServiceImpl(
            ActivityRepository activityRepo,
            TripRepository tripRepo,
            ActivityMapper activityMapper) {

        this.activityRepo = activityRepo;
        this.tripRepo = tripRepo;
        this.activityMapper = activityMapper;
    }

    @Override
    public ActivityResponseDto createActivity(ActivityRequestDto request) {

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + request.getTripId()));

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException(
                    "End Time cannot be before Start Time.");
        }

        if (request.getActivityDate().isBefore(trip.getStartDate())
                || request.getActivityDate().isAfter(trip.getEndDate())) {

            throw new IllegalArgumentException(
                    "Activity Date must be within Trip Duration.");
        }

        Activity activity =
                activityMapper.mapToActivity(request, trip);

        if (Boolean.TRUE.equals(request.getBookingRequired())) {

            activity.setBookingReference(
                    "ACT-" + UUID.randomUUID()
                            .toString()
                            .substring(0, 8)
                            .toUpperCase());
        } else {

            activity.setBookingReference(null);
        }

        Activity savedActivity =
                activityRepo.save(activity);

        return activityMapper
                .mapToActivityResponse(savedActivity);
    }

    @Override
    public ActivityResponseDto getActivityById(Long activityId) {

        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() ->
                        new ActivityNotFoundException(
                                "Activity not found with ID : "
                                        + activityId));

        return activityMapper.mapToActivityResponse(activity);
    }

    @Override
    public List<ActivityResponseDto> getAllActivities() {

        return activityRepo.findAll()
                .stream()
                .map(activityMapper::mapToActivityResponse)
                .toList();
    }

    @Override
    public List<ActivityResponseDto> getActivitiesByTrip(Long tripId) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + tripId));

        return activityRepo.findByTrip(trip)
                .stream()
                .map(activityMapper::mapToActivityResponse)
                .toList();
    }

    @Override
    public ActivityResponseDto updateActivity(
            Long activityId,
            ActivityRequestDto request) {

        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() ->
                        new ActivityNotFoundException(
                                "Activity not found with ID : "
                                        + activityId));

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : "
                                        + request.getTripId()));

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException(
                    "End Time cannot be before Start Time.");
        }

        activity.setTrip(trip);
        activity.setActivityName(request.getActivityName());
        activity.setActivityCategory(request.getActivityCategory());
        activity.setLocation(request.getLocation());
        activity.setActivityDate(request.getActivityDate());
        activity.setStartTime(request.getStartTime());
        activity.setEndTime(request.getEndTime());
        activity.setEstimatedCost(request.getEstimatedCost());
        activity.setBookingRequired(request.getBookingRequired());
        activity.setActivityStatus(request.getActivityStatus());
        activity.setNotes(request.getNotes());

        if (Boolean.TRUE.equals(request.getBookingRequired())) {

            if (activity.getBookingReference() == null) {

                activity.setBookingReference(
                        "ACT-" + UUID.randomUUID()
                                .toString()
                                .substring(0, 8)
                                .toUpperCase());
            }

        } else {

            activity.setBookingReference(null);
        }

        Activity updatedActivity =
                activityRepo.save(activity);

        return activityMapper
                .mapToActivityResponse(updatedActivity);
    }

    @Override
    public void deleteActivity(Long activityId) {

        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() ->
                        new ActivityNotFoundException(
                                "Activity not found with ID : "
                                        + activityId));

        activityRepo.delete(activity);
    }

}