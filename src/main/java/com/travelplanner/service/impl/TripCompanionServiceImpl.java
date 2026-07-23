package com.travelplanner.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.travelplanner.dto.TripCompanionRequestDto;
import com.travelplanner.dto.TripCompanionResponseDto;
import com.travelplanner.entity.Trip;
import com.travelplanner.entity.TripCompanion;
import com.travelplanner.exception.TripCompanionNotFoundException;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.mapper.TripCompanionMapper;
import com.travelplanner.repo.TripCompanionRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.service.TripCompanionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TripCompanionServiceImpl implements TripCompanionService {

    private final TripCompanionRepository tripCompanionRepository;
    private final TripRepository tripRepository;
    private final TripCompanionMapper tripCompanionMapper;

    @Override
    public TripCompanionResponseDto addCompanion(Long tripId,
                                                 TripCompanionRequestDto requestDto) {

    	Trip trip = tripRepository.findById(tripId)
    	        .orElseThrow(() ->
    	                new TripNotFoundException("Trip not found with id : " + tripId));

        TripCompanion companion =
                tripCompanionMapper.toEntity(requestDto, trip);

        TripCompanion savedCompanion =
                tripCompanionRepository.save(companion);

        return tripCompanionMapper.toResponse(savedCompanion);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TripCompanionResponseDto> getCompanionsByTrip(Long tripId) {

        return tripCompanionRepository.findByTripTripId(tripId)
                .stream()
                .map(tripCompanionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TripCompanionResponseDto updateCompanion(Long companionId,
                                                    TripCompanionRequestDto requestDto) {

    	TripCompanion companion =
    	        tripCompanionRepository.findById(companionId)
    	                .orElseThrow(() ->
    	                        new TripCompanionNotFoundException(
    	                                "Companion not found with id : " + companionId));

        companion.setFirstName(requestDto.getFirstName());
        companion.setLastName(requestDto.getLastName());
        companion.setRelationship(requestDto.getRelationship());
        companion.setGender(requestDto.getGender());
        companion.setAge(requestDto.getAge());
        companion.setMobileNumber(requestDto.getMobileNumber());
        companion.setEmail(requestDto.getEmail());
        companion.setEmergencyContact(requestDto.getEmergencyContact());
        companion.setIsTripOwner(requestDto.getIsTripOwner());

        TripCompanion updated =
                tripCompanionRepository.save(companion);

        return tripCompanionMapper.toResponse(updated);
    }

    @Override
    public void deleteCompanion(Long companionId) {

    	TripCompanion companion =
    	        tripCompanionRepository.findById(companionId)
    	                .orElseThrow(() ->
    	                        new TripCompanionNotFoundException(
    	                                "Companion not found with id : " + companionId));

        if (Boolean.TRUE.equals(companion.getIsTripOwner())) {
            throw new IllegalArgumentException(
                    "Trip owner cannot be deleted.");
        }

        tripCompanionRepository.delete(companion);
    }

}