package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.ActivityRequestDto;
import com.travelplanner.dto.ActivityResponseDto;
import com.travelplanner.entity.Activity;
import com.travelplanner.entity.Trip;

@Component
public class ActivityMapper {

    public Activity mapToActivity(
            ActivityRequestDto dto,
            Trip trip) {

        Activity activity = new Activity();

        activity.setTrip(trip);

        activity.setActivityName(dto.getActivityName());
        activity.setActivityCategory(dto.getActivityCategory());
        activity.setLocation(dto.getLocation());

        activity.setActivityDate(dto.getActivityDate());

        activity.setStartTime(dto.getStartTime());
        activity.setEndTime(dto.getEndTime());

        activity.setEstimatedCost(dto.getEstimatedCost());

        activity.setBookingRequired(dto.getBookingRequired());

        // Generated in Service Layer
        activity.setBookingReference(dto.getBookingReference());

        activity.setActivityStatus(dto.getActivityStatus());

        activity.setNotes(dto.getNotes());

        return activity;
    }

    public ActivityResponseDto mapToActivityResponse(
            Activity activity) {

        ActivityResponseDto response =
                new ActivityResponseDto();

        response.setActivityId(activity.getActivityId());

        response.setTripId(
                activity.getTrip().getTripId());

        response.setTripTitle(
                activity.getTrip().getTitle());

        response.setActivityName(
                activity.getActivityName());

        response.setActivityCategory(
                activity.getActivityCategory());

        response.setLocation(
                activity.getLocation());

        response.setActivityDate(
                activity.getActivityDate());

        response.setStartTime(
                activity.getStartTime());

        response.setEndTime(
                activity.getEndTime());

        response.setEstimatedCost(
                activity.getEstimatedCost());

        response.setBookingRequired(
                activity.getBookingRequired());

        response.setBookingReference(
                activity.getBookingReference());

        response.setActivityStatus(
                activity.getActivityStatus());

        response.setNotes(
                activity.getNotes());

        response.setCreatedAt(
                activity.getCreatedAt());

        response.setUpdatedAt(
                activity.getUpdatedAt());

        return response;
    }

}