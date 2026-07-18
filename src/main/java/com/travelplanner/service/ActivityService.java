package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.ActivityRequestDto;
import com.travelplanner.dto.ActivityResponseDto;
import com.travelplanner.dto.PageResponseDto;
import java.time.LocalDate;

import com.travelplanner.enums.ActivityCategory;
import com.travelplanner.enums.ActivityStatus;
public interface ActivityService {

    ActivityResponseDto createActivity(ActivityRequestDto request);

    ActivityResponseDto getActivityById(Long activityId);

    PageResponseDto<ActivityResponseDto> getAllActivities(
            int page,
            int size,
            String sortBy,
            String direction,
            String activityName,
            ActivityCategory activityCategory,
            String location,
            ActivityStatus activityStatus,
            Boolean bookingRequired,
            Double minEstimatedCost,
            Double maxEstimatedCost,
            LocalDate activityDate);
    List<ActivityResponseDto> getActivitiesByTrip(Long tripId);

    ActivityResponseDto updateActivity(Long activityId,
                                       ActivityRequestDto request);

    void deleteActivity(Long activityId);

}