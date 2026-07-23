package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.TripCompanionRequestDto;
import com.travelplanner.dto.TripCompanionResponseDto;
import com.travelplanner.entity.Trip;
import com.travelplanner.entity.TripCompanion;

@Component
public class TripCompanionMapper {

    public TripCompanion toEntity(TripCompanionRequestDto dto, Trip trip) {

        TripCompanion companion = new TripCompanion();

        companion.setTrip(trip);
        companion.setFirstName(dto.getFirstName());
        companion.setLastName(dto.getLastName());
        companion.setRelationship(dto.getRelationship());
        companion.setGender(dto.getGender());
        companion.setAge(dto.getAge());
        companion.setMobileNumber(dto.getMobileNumber());
        companion.setEmail(dto.getEmail());
        companion.setEmergencyContact(dto.getEmergencyContact());
        companion.setIsTripOwner(Boolean.TRUE.equals(dto.getIsTripOwner()));

        return companion;
    }

    public TripCompanionResponseDto toResponse(TripCompanion companion) {

        TripCompanionResponseDto dto = new TripCompanionResponseDto();

        dto.setCompanionId(companion.getCompanionId());
        dto.setTripId(companion.getTrip().getTripId());
        dto.setFirstName(companion.getFirstName());
        dto.setLastName(companion.getLastName());
        dto.setRelationship(companion.getRelationship());
        dto.setGender(companion.getGender());
        dto.setAge(companion.getAge());
        dto.setMobileNumber(companion.getMobileNumber());
        dto.setEmail(companion.getEmail());
        dto.setEmergencyContact(companion.getEmergencyContact());
        dto.setIsTripOwner(companion.getIsTripOwner());

        return dto;
    }
}