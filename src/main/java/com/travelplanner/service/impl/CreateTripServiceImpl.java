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
import com.travelplanner.mapper.AccommodationMapper;
import com.travelplanner.mapper.TransportationMapper;
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
    private final AccommodationMapper accommodationMapper;
    private final TransportationMapper transportationMapper;
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

            for (com.travelplanner.dto.TripCompanionRequestDto dto : request.getCompanions()) {

                TripCompanion companion =
                        tripCompanionMapper.toEntity(dto, trip);

                trip.getCompanions().add(companion);
            }
        }

        if (request.getAccommodations() != null &&
                !request.getAccommodations().isEmpty()) {

            for (com.travelplanner.dto.AccommodationRequestDto dto : request.getAccommodations()) {

                com.travelplanner.entity.Accommodation acc =
                        accommodationMapper.mapToAccommodation(dto, trip);

                trip.getAccommodations().add(acc);
            }
        }

        if (request.getTransportations() != null &&
                !request.getTransportations().isEmpty()) {

            for (com.travelplanner.dto.TransportationRequestDto dto : request.getTransportations()) {

                com.travelplanner.entity.Transportation trans =
                        transportationMapper.mapToTransportation(dto, trip);

                trip.getTransportations().add(trans);
            }
        }

        // Single save - CascadeType.ALL persists companions
        Trip savedTrip = tripRepository.save(trip);
        
        try {
            EmailRequestDto emailRequest = new EmailRequestDto();
            emailRequest.setTo(user.getEmail());
            emailRequest.setSubject("Booking Confirmation - " + savedTrip.getTitle());
            emailRequest.setBody(
                    EmailTemplateUtil.tripCreated(user, savedTrip));
            emailService.sendHtmlEmail(emailRequest);
        } catch (Exception e) {
            System.err.println("[WARN] Failed to send trip creation email: " + e.getMessage());
        }

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