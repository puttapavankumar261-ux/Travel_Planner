package com.travelplanner.service.impl;

import org.slf4j.Logger;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.travelplanner.specification.TripSpecification;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.travelplanner.dto.NotificationRequestDto;
import com.travelplanner.dto.PageResponseDto;
import com.travelplanner.dto.TripDestinationAnalyticsDto;
import com.travelplanner.dto.TripRequestDto;
import com.travelplanner.dto.TripResponseDto;
import com.travelplanner.dto.TripStatusAnalyticsDto;
import com.travelplanner.entity.Trip;
import com.travelplanner.entity.User;
import com.travelplanner.enums.NotificationAction;
import com.travelplanner.enums.NotificationModule;
import com.travelplanner.enums.NotificationPriority;
import com.travelplanner.enums.NotificationRecipientType;
import com.travelplanner.enums.ReferenceType;
import com.travelplanner.enums.TripStatus;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.exception.UserNotFoundException;
import com.travelplanner.mapper.TripMapper;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.NotificationManagementService;
import com.travelplanner.service.TripService;
import com.travelplanner.util.PaginationUtil;

@Service
public class TripServiceImpl implements TripService {

    private static final Logger logger =
            LoggerFactory.getLogger(TripServiceImpl.class);
    private final NotificationManagementService notificationManagementService;
    private final TripRepository tripRepo;
    private final UserRepository userRepo;
    private final TripMapper tripMapper;

    public TripServiceImpl(
            TripRepository tripRepo,
            UserRepository userRepo,
            TripMapper tripMapper,
            NotificationManagementService notificationManagementService) {

        this.tripRepo = tripRepo;
        this.userRepo = userRepo;
        this.tripMapper = tripMapper;
        this.notificationManagementService = notificationManagementService;
    }

    @Override
    public TripResponseDto createTrip(TripRequestDto request) {

        logger.info("Creating trip '{}' for user ID: {}",
                request.getTitle(), request.getUserId());

        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> {

                    logger.warn("User not found with ID: {}",
                            request.getUserId());

                    return new UserNotFoundException(
                            "User not found with ID : " + request.getUserId());
                });

        Trip trip = tripMapper.mapToTrip(request, user);

        Trip savedTrip = tripRepo.save(trip);

        logger.info("Trip created successfully with ID: {}",
                savedTrip.getTripId());

        NotificationRequestDto notification = new NotificationRequestDto();

        notification.setTitle("Trip Created");

        notification.setMessage(
                "Your trip '" + savedTrip.getTitle() + "' has been created successfully.");

        notification.setModule(NotificationModule.TRIP);

        notification.setAction(NotificationAction.CREATED);

        notification.setPriority(NotificationPriority.MEDIUM);

        notification.setRecipientType(NotificationRecipientType.USER);

        notification.setRecipientUserId(user.getUserId());

        notification.setPerformedByUserId(user.getUserId());

        notification.setReferenceType(ReferenceType.TRIP);

        notification.setReferenceId(savedTrip.getTripId());

        try {
            notificationManagementService.createNotification(notification);

            logger.info(
                    "Trip creation notification created for trip ID: {}",
                    savedTrip.getTripId());

        } catch (Exception ex) {

            logger.error(
                    "Failed to create trip notification for trip ID: {}",
                    savedTrip.getTripId(),
                    ex);
        }

        return tripMapper.mapToTripResponse(savedTrip);
    }

    @Override
    public TripResponseDto getTripById(Long tripId) {

        logger.info("Fetching trip with ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : " + tripId);
                });

        logger.info("Trip retrieved successfully with ID: {}", tripId);

        return tripMapper.mapToTripResponse(trip);
    }

    @Override
    public PageResponseDto<TripResponseDto> getAllTrips(
            int page,
            int size,
            String sortBy,
            String direction,
            String destination,
            TripStatus tripStatus,
            Double minBudget,
            Double maxBudget,
            LocalDate startDate,
            LocalDate endDate) {

        logger.info(
                "Fetching trips with filters - Page: {}, Size: {}, SortBy: {}, Direction: {}, Destination: {}, Status: {}",
                page, size, sortBy, direction, destination, tripStatus);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Trip> specification = TripSpecification.filterTrips(
                destination,
                tripStatus,
                startDate,
                endDate,
                minBudget,
                maxBudget);

        Page<Trip> tripPage = tripRepo.findAll(specification, pageable);

        Page<TripResponseDto> dtoPage =
                tripPage.map(tripMapper::mapToTripResponse);

        logger.info(
                "Retrieved {} trip(s) on page {}.",
                dtoPage.getNumberOfElements(),
                dtoPage.getNumber());

        return PaginationUtil.build(dtoPage);
    }

    @Override
    public java.util.List<TripResponseDto> getTripsByUser(Long userId) {

        logger.info("Fetching trips for user ID: {}", userId);

        User user = userRepo.findById(userId)
                .orElseThrow(() -> {

                    logger.warn("User not found with ID: {}", userId);

                    return new UserNotFoundException(
                            "User not found with ID : " + userId);
                });

        java.util.List<TripResponseDto> trips = tripRepo.findByUser(user)
                .stream()
                .map(tripMapper::mapToTripResponse)
                .toList();

        logger.info("Retrieved {} trip(s) for user ID: {}",
                trips.size(), userId);

        return trips;
    }

    @Override
    public java.util.List<TripResponseDto> getTripsByStatus(
            TripStatus tripStatus) {

        logger.info("Fetching trips with status: {}", tripStatus);

        java.util.List<TripResponseDto> trips =
                tripRepo.findByTripStatus(tripStatus)
                        .stream()
                        .map(tripMapper::mapToTripResponse)
                        .toList();

        logger.info("Retrieved {} trip(s) with status: {}",
                trips.size(), tripStatus);

        return trips;
    }

    @Override
    public TripResponseDto updateTrip(
            Long tripId,
            TripRequestDto request) {

        logger.info("Updating trip with ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : " + tripId);
                });

        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> {

                    logger.warn("User not found with ID: {}",
                            request.getUserId());

                    return new UserNotFoundException(
                            "User not found with ID : " + request.getUserId());
                });

        trip.setTitle(request.getTitle());
        trip.setSource(request.getSource());
        trip.setDestination(request.getDestination());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setBudget(request.getBudget());
        trip.setDescription(request.getDescription());
        trip.setTripStatus(request.getTripStatus());
        trip.setUser(user);

        Trip updatedTrip = tripRepo.save(trip);
        
        NotificationRequestDto notification = new NotificationRequestDto();

        notification.setTitle("Trip Updated");

        notification.setMessage(
                "Your trip '" + updatedTrip.getTitle() + "' has been updated successfully.");

        notification.setModule(NotificationModule.TRIP);

        notification.setAction(NotificationAction.UPDATED);

        notification.setPriority(NotificationPriority.LOW);

        notification.setRecipientType(NotificationRecipientType.USER);

        notification.setRecipientUserId(user.getUserId());

        notification.setPerformedByUserId(user.getUserId());

        notification.setReferenceType(ReferenceType.TRIP);

        notification.setReferenceId(updatedTrip.getTripId());

        try {
            notificationManagementService.createNotification(notification);

            logger.info(
                    "Trip update notification created for trip ID: {}",
                    updatedTrip.getTripId());

        } catch (Exception ex) {

            logger.error(
                    "Failed to create trip update notification for trip ID: {}",
                    updatedTrip.getTripId(),
                    ex);
        }

        logger.info("Trip updated successfully with ID: {}", tripId);

        return tripMapper.mapToTripResponse(updatedTrip);
    }

    @Override
    public void deleteTrip(Long tripId) {

        logger.info("Deleting trip with ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> {

                    logger.warn("Trip not found with ID: {}", tripId);

                    return new TripNotFoundException(
                            "Trip not found with ID : " + tripId);
                });

        NotificationRequestDto notification = new NotificationRequestDto();

        notification.setTitle("Trip Deleted");

        notification.setMessage(
                "Your trip '" + trip.getTitle() + "' has been deleted successfully.");

        notification.setModule(NotificationModule.TRIP);

        notification.setAction(NotificationAction.DELETED);

        notification.setPriority(NotificationPriority.HIGH);

        notification.setRecipientType(NotificationRecipientType.USER);

        notification.setRecipientUserId(trip.getUser().getUserId());

        notification.setPerformedByUserId(trip.getUser().getUserId());

        notification.setReferenceType(ReferenceType.TRIP);

        notification.setReferenceId(trip.getTripId());

        try {
            notificationManagementService.createNotification(notification);

            logger.info(
                    "Trip deletion notification created for trip ID: {}",
                    trip.getTripId());

        } catch (Exception ex) {

            logger.error(
                    "Failed to create trip deletion notification for trip ID: {}",
                    trip.getTripId(),
                    ex);
        }
        logger.info("Trip deletion notification created for trip ID: {}",
                trip.getTripId());

        tripRepo.delete(trip);

        logger.info("Trip deleted successfully with ID: {}", tripId);
    }

	@Override
	public List<TripStatusAnalyticsDto> getTripStatusAnalytics() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TripDestinationAnalyticsDto> getTripDestinationAnalytics() {
		// TODO Auto-generated method stub
		return null;
	}
}