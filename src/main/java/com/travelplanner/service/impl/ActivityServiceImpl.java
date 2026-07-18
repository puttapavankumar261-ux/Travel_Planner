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

    private static final Logger logger =
            LoggerFactory.getLogger(ActivityServiceImpl.class);

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

        logger.info("Creating activity for trip ID: {}", request.getTripId());

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + request.getTripId());
                });

        if (request.getEndTime().isBefore(request.getStartTime())) {

            logger.warn("Invalid activity time. End time is before start time.");

            throw new IllegalArgumentException(
                    "End Time cannot be before Start Time.");
        }

        if (request.getActivityDate().isBefore(trip.getStartDate())
                || request.getActivityDate().isAfter(trip.getEndDate())) {

            logger.warn("Activity date is outside trip duration.");

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

            logger.info("Booking reference generated for activity.");
        } else {

            activity.setBookingReference(null);
        }

        Activity savedActivity =
                activityRepo.save(activity);

        logger.info("Activity created successfully with ID: {}",
                savedActivity.getActivityId());

        return activityMapper.mapToActivityResponse(savedActivity);
    }

    @Override
    public ActivityResponseDto getActivityById(Long activityId) {

        logger.info("Fetching activity with ID: {}", activityId);

        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() -> {

                    logger.warn("Activity not found with ID: {}", activityId);

                    return new ActivityNotFoundException(
                            "Activity not found with ID : "
                                    + activityId);
                });

        logger.info("Activity retrieved successfully with ID: {}", activityId);

        return activityMapper.mapToActivityResponse(activity);
    }

    @Override
    public PageResponseDto<ActivityResponseDto> getAllActivities(
            int page,
            int size,
            String sortBy,
            String direction) {

        logger.info(
                "Fetching activities - Page: {}, Size: {}, SortBy: {}, Direction: {}",
                page, size, sortBy, direction);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Activity> activityPage = activityRepo.findAll(pageable);

        Page<ActivityResponseDto> dtoPage =
                activityPage.map(activityMapper::mapToActivityResponse);

        logger.info(
                "Retrieved {} activity(s) on page {}.",
                dtoPage.getNumberOfElements(),
                dtoPage.getNumber());

        return PaginationUtil.build(dtoPage);
    }

    @Override
    public List<ActivityResponseDto> getActivitiesByTrip(Long tripId) {

        logger.info("Fetching activities for trip ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + tripId);
                });

        List<ActivityResponseDto> activities =
                activityRepo.findByTrip(trip)
                        .stream()
                        .map(activityMapper::mapToActivityResponse)
                        .toList();

        logger.info("Retrieved {} activity(s) for trip ID: {}",
                activities.size(), tripId);

        return activities;
    }

    @Override
    public ActivityResponseDto updateActivity(
            Long activityId,
            ActivityRequestDto request) {

        logger.info("Updating activity with ID: {}", activityId);

        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() -> {

                    logger.warn("Activity not found with ID: {}", activityId);

                    return new ActivityNotFoundException(
                            "Activity not found with ID : "
                                    + activityId);
                });

        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", request.getTripId());

                    return new TripNotFoundException(
                            "Trip not found with ID : "
                                    + request.getTripId());
                });

        if (request.getEndTime().isBefore(request.getStartTime())) {

            logger.warn("Invalid activity time. End time is before start time.");

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

                logger.info("Booking reference generated for updated activity.");
            }

        } else {

            activity.setBookingReference(null);
        }

        Activity updatedActivity =
                activityRepo.save(activity);

        logger.info("Activity updated successfully with ID: {}", activityId);

        return activityMapper.mapToActivityResponse(updatedActivity);
    }

    @Override
    public void deleteActivity(Long activityId) {

        logger.info("Deleting activity with ID: {}", activityId);

        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() -> {

                    logger.warn("Activity not found with ID: {}", activityId);

                    return new ActivityNotFoundException(
                            "Activity not found with ID : "
                                    + activityId);
                });

        activityRepo.delete(activity);

        logger.info("Activity deleted successfully with ID: {}", activityId);
    }

}