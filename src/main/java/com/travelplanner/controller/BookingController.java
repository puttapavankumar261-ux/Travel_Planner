package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.dto.BookingRequestDto;
import com.travelplanner.dto.BookingResponseDto;
import com.travelplanner.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDto> createBooking(
            @RequestBody BookingRequestDto bookingRequestDto) {

        BookingResponseDto response =
                bookingService.createBooking(bookingRequestDto);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponseDto> getBookingById(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(
                bookingService.getBookingById(bookingId));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponseDto>> getMyBookings() {

        return ResponseEntity.ok(
                bookingService.getMyBookings());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<BookingResponseDto>> getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings());
    }

    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<String> cancelBooking(
            @PathVariable Long bookingId) {

        bookingService.cancelBooking(bookingId);

        return ResponseEntity.ok("Booking cancelled successfully.");
    }
}