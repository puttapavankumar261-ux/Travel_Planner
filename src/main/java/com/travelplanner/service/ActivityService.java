package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.ActivityRequestDto;
import com.travelplanner.dto.ActivityResponseDto;

public interface ActivityService {

    ActivityResponseDto createActivity(ActivityRequestDto request);

    ActivityResponseDto getActivityById(Long activityId);

    List<ActivityResponseDto> getAllActivities();

    List<ActivityResponseDto> getActivitiesByTrip(Long tripId);

    ActivityResponseDto updateActivity(Long activityId,
                                       ActivityRequestDto request);

    void deleteActivity(Long activityId);

}