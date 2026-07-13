package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.ItineraryRequestDto;
import com.travelplanner.dto.ItineraryResponseDto;
import com.travelplanner.entity.Itinerary;
import com.travelplanner.entity.Trip;

@Component
public class ItineraryMapper {

    public Itinerary mapToItinerary(ItineraryRequestDto dto, Trip trip) {

        Itinerary itinerary = new Itinerary();

        itinerary.setTrip(trip);
        itinerary.setDayNumber(dto.getDayNumber());
        itinerary.setActivityTitle(dto.getActivityTitle());
        itinerary.setLocation(dto.getLocation());
        itinerary.setActivityDate(dto.getActivityDate());
        itinerary.setStartTime(dto.getStartTime());
        itinerary.setEndTime(dto.getEndTime());
        itinerary.setNotes(dto.getNotes());

        return itinerary;
    }

    public ItineraryResponseDto mapToItineraryResponse(Itinerary itinerary) {

        ItineraryResponseDto response = new ItineraryResponseDto();

        response.setItineraryId(itinerary.getItineraryId());
        response.setTripId(itinerary.getTrip().getTripId());
        response.setTripTitle(itinerary.getTrip().getTitle());
        response.setDayNumber(itinerary.getDayNumber());
        response.setActivityTitle(itinerary.getActivityTitle());
        response.setLocation(itinerary.getLocation());
        response.setActivityDate(itinerary.getActivityDate());
        response.setStartTime(itinerary.getStartTime());
        response.setEndTime(itinerary.getEndTime());
        response.setNotes(itinerary.getNotes());
        response.setCreatedAt(itinerary.getCreatedAt());
        response.setUpdatedAt(itinerary.getUpdatedAt());

        return response;
    }

}