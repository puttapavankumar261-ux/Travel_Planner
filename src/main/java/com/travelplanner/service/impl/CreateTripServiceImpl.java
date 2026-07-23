package com.travelplanner.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.travelplanner.dto.CreateTripRequestDto;
import com.travelplanner.dto.CreateTripResponseDto;
import com.travelplanner.dto.EmailRequestDto;
import com.travelplanner.dto.TripCompanionRequestDto;
import com.travelplanner.dto.TripCompanionResponseDto;
import com.travelplanner.dto.TripResponseDto;
import com.travelplanner.entity.Trip;
import com.travelplanner.entity.TripCompanion;
import com.travelplanner.entity.User;
import com.travelplanner.exception.UserNotFoundException;
import com.travelplanner.mapper.TripCompanionMapper;
import com.travelplanner.mapper.TripMapper;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.CreateTripService;
import com.travelplanner.service.EmailService;
import com.travelplanner.util.EmailTemplateUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CreateTripServiceImpl implements CreateTripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final TripMapper tripMapper;
    private final TripCompanionMapper tripCompanionMapper;
    private final EmailService emailService;

    @Override
    public CreateTripResponseDto createTrip(CreateTripRequestDto request) {

        User user = userRepository.findById(request.getTrip().getUserId())
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with ID : "
                                        + request.getTrip().getUserId()));

        // Create Trip
        Trip trip = tripMapper.mapToTrip(request.getTrip(), user);

        List<TripCompanionResponseDto> companionResponses = new ArrayList<>();

        // Add companions before saving the trip
        if (request.getCompanions() != null &&
                !request.getCompanions().isEmpty()) {

            for (TripCompanionRequestDto dto : request.getCompanions()) {

                TripCompanion companion =
                        tripCompanionMapper.toEntity(dto, trip);

                trip.getCompanions().add(companion);
            }
        }

        // Single save - CascadeType.ALL persists companions
        Trip savedTrip = tripRepository.save(trip);
        
        EmailRequestDto emailRequest = new EmailRequestDto();
        emailRequest.setTo(user.getEmail());
        emailRequest.setSubject("Trip Created Successfully");
        emailRequest.setBody(
                EmailTemplateUtil.tripCreated(user, savedTrip));

        emailService.sendHtmlEmail(emailRequest);

        // Prepare companion response
        for (TripCompanion companion : savedTrip.getCompanions()) {
            companionResponses.add(
                    tripCompanionMapper.toResponse(companion));
        }

        TripResponseDto tripResponse =
                tripMapper.mapToTripResponse(savedTrip);

        CreateTripResponseDto response =
                new CreateTripResponseDto();

        response.setTrip(tripResponse);
        response.setCompanions(companionResponses);

        return response;
    }
}