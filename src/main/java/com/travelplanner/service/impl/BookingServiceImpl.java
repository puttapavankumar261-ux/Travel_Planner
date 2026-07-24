package com.travelplanner.service.impl;

import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.travelplanner.dto.BookingRequestDto;
import com.travelplanner.dto.BookingResponseDto;
import com.travelplanner.entity.Booking;
import com.travelplanner.entity.Trip;
import com.travelplanner.entity.User;
import com.travelplanner.enums.BookingStatus;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.exception.UserNotFoundException;
import com.travelplanner.mapper.BookingMapper;
import com.travelplanner.repo.BookingRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final BookingMapper bookingMapper;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            TripRepository tripRepository,
            BookingMapper bookingMapper) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
        this.bookingMapper = bookingMapper;
    }

    @Override
    public BookingResponseDto createBooking(BookingRequestDto dto) {

        // Get the logged-in user's email from the JWT
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        // Find the logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("Authenticated user not found"));

        // Find the trip
        Trip trip = tripRepository.findById(dto.getTripId())
                .orElseThrow(() ->
                        new TripNotFoundException("Trip not found"));

        // Create booking
        Booking booking = new Booking();

        booking.setUser(user);
        booking.setTrip(trip);
        booking.setAmount(trip.getBudget());
        booking.setRemarks(dto.getRemarks());
        booking.setBookingStatus(BookingStatus.BOOKED);
        booking.setBookingReference(generateBookingReference());

        Booking savedBooking = bookingRepository.save(booking);

        return bookingMapper.toResponseDto(savedBooking);
    }

    @Override
    public BookingResponseDto getBookingById(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return bookingMapper.toResponseDto(booking);
    }

    @Override
    public List<BookingResponseDto> getMyBookings() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("Authenticated user not found"));

        return bookingRepository.findByUserUserId(user.getUserId())
                .stream()
                .map(bookingMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponseDto> getAllBookings() {

        return bookingRepository.findAll()
                .stream()
                .map(bookingMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setBookingStatus(BookingStatus.CANCELLED);

        bookingRepository.save(booking);
    }

    private String generateBookingReference() {

        long count = bookingRepository.count() + 1;

        return "TPB-"
                + Year.now().getValue()
                + "-"
                + String.format("%06d", count);
    }

}