package com.travelplanner.service.impl;

import org.slf4j.Logger;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
import com.travelplanner.dto.TripCancellationRequestDto;
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
import com.travelplanner.service.EmailService;
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
    private final EmailService emailService;
    
    public TripServiceImpl(
            TripRepository tripRepo,
            UserRepository userRepo,
            TripMapper tripMapper,
            NotificationManagementService notificationManagementService,
            EmailService emailService) {

        this.tripRepo = tripRepo;
        this.userRepo = userRepo;
        this.tripMapper = tripMapper;
        this.notificationManagementService = notificationManagementService;
        this.emailService = emailService;
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

        try {

            logger.info("===== CREATING USER NOTIFICATION =====");

            NotificationRequestDto userNotification = new NotificationRequestDto();

            userNotification.setTitle("Trip Created");

            userNotification.setMessage(
                    "Your trip '" + savedTrip.getTitle()
                            + "' has been created successfully.");

            userNotification.setModule(NotificationModule.TRIP);

            userNotification.setAction(NotificationAction.CREATED);

            userNotification.setPriority(NotificationPriority.MEDIUM);

            userNotification.setRecipientType(NotificationRecipientType.USER);

            userNotification.setRecipientUserId(user.getUserId());

            userNotification.setPerformedByUserId(user.getUserId());

            userNotification.setReferenceType(ReferenceType.TRIP);

            userNotification.setReferenceId(savedTrip.getTripId());

            notificationManagementService.createNotification(userNotification);

            logger.info("User notification created successfully.");


            logger.info("===== CREATING ADMIN NOTIFICATION =====");

            NotificationRequestDto adminNotification = new NotificationRequestDto();

            adminNotification.setTitle("New Trip Created");

            adminNotification.setMessage(
                    user.getFirstName() + " "
                            + user.getLastName()
                            + " created a new trip '"
                            + savedTrip.getTitle() + "'.");

            adminNotification.setModule(NotificationModule.TRIP);

            adminNotification.setAction(NotificationAction.CREATED);

            adminNotification.setPriority(NotificationPriority.MEDIUM);

            adminNotification.setRecipientType(NotificationRecipientType.ADMIN);

            // Global notification for admins
            adminNotification.setRecipientUserId(null);

            adminNotification.setPerformedByUserId(user.getUserId());

            adminNotification.setReferenceType(ReferenceType.TRIP);

            adminNotification.setReferenceId(savedTrip.getTripId());

            notificationManagementService.createNotification(adminNotification);

            logger.info("Admin notification created successfully.");

        } catch (Exception ex) {

            logger.error(
                    "Failed to create notification(s) for Trip ID : {}",
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
    public TripResponseDto cancelTrip(
            Long tripId,
            TripCancellationRequestDto request) {

        logger.info("Cancelling trip ID: {}", tripId);

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() ->
                        new TripNotFoundException(
                                "Trip not found with ID : " + tripId));

        if (trip.getTripStatus() == TripStatus.CANCELLED) {
            throw new IllegalStateException("Trip is already cancelled.");
        }

        User cancelledBy = userRepo.findById(request.getCancelledByUserId())
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with ID : "
                                        + request.getCancelledByUserId()));

        trip.setTripStatus(TripStatus.CANCELLED);

        trip.setCancellationReason(request.getReason());

        trip.setCancelledAt(LocalDateTime.now());

        trip.setCancelledBy(cancelledBy);

        trip.setCancelledByRole(request.getCancelledByRole());

        Trip cancelledTrip = tripRepo.save(trip);
        
        try {
            emailService.sendTripCancellationEmail(
                    cancelledTrip,
                    request.getReason());

            logger.info("Trip cancellation email sent successfully.");

        } catch (Exception ex) {

            logger.error("Failed to send trip cancellation email.", ex);
        }
     // ================= USER NOTIFICATION =================

        try {

            NotificationRequestDto userNotification = new NotificationRequestDto();

            userNotification.setTitle("Trip Cancelled");

            userNotification.setMessage(
                    "Your trip '" + cancelledTrip.getTitle()
                    + "' has been cancelled successfully."
                    + " Reason: " + request.getReason());

            userNotification.setModule(NotificationModule.TRIP);

            userNotification.setAction(NotificationAction.CANCELLED);

            userNotification.setPriority(NotificationPriority.HIGH);

            userNotification.setRecipientType(NotificationRecipientType.USER);

            userNotification.setRecipientUserId(cancelledTrip.getUser().getUserId());

            userNotification.setPerformedByUserId(cancelledBy.getUserId());

            userNotification.setReferenceType(ReferenceType.TRIP);

            userNotification.setReferenceId(cancelledTrip.getTripId());

            notificationManagementService.createNotification(userNotification);

            logger.info("User cancellation notification created.");

        } catch (Exception ex) {

            logger.error("Failed to create user cancellation notification.", ex);

        }

        // ================= ADMIN NOTIFICATION =================

        try {

            NotificationRequestDto adminNotification = new NotificationRequestDto();

            adminNotification.setTitle("Trip Cancelled");

            adminNotification.setMessage(

                    cancelledBy.getFirstName() + " "
                    + cancelledBy.getLastName()
                    + " cancelled trip '"
                    + cancelledTrip.getTitle()
                    + "'."

                    + " Reason: "
                    + request.getReason());

            adminNotification.setModule(NotificationModule.TRIP);

            adminNotification.setAction(NotificationAction.CANCELLED);

            adminNotification.setPriority(NotificationPriority.HIGH);

            adminNotification.setRecipientType(NotificationRecipientType.ADMIN);

            adminNotification.setRecipientUserId(null);

            adminNotification.setPerformedByUserId(cancelledBy.getUserId());

            adminNotification.setReferenceType(ReferenceType.TRIP);

            adminNotification.setReferenceId(cancelledTrip.getTripId());

            notificationManagementService.createNotification(adminNotification);

            logger.info("Admin cancellation notification created.");

        } catch (Exception ex) {

            logger.error("Failed to create admin cancellation notification.", ex);

        }

        logger.info("Trip cancelled successfully.");

        return tripMapper.mapToTripResponse(cancelledTrip);
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