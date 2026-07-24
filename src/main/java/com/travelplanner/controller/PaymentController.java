package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.dto.PaymentRequestDto;
import com.travelplanner.dto.PaymentResponseDto;
import com.travelplanner.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Make Payment
     */
    @PostMapping
    public ResponseEntity<PaymentResponseDto> makePayment(
            @RequestBody PaymentRequestDto paymentRequestDto) {

        PaymentResponseDto response =
                paymentService.makePayment(paymentRequestDto);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get Payment by Payment Id
     */
    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentResponseDto> getPaymentById(
            @PathVariable Long paymentId) {

        return ResponseEntity.ok(
                paymentService.getPaymentById(paymentId));
    }

    /**
     * Get Payment by Booking Id
     */
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<PaymentResponseDto> getPaymentByBookingId(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(
                paymentService.getPaymentByBookingId(bookingId));
    }

    /**
     * Logged-in User Payments
     */
    @GetMapping("/my-payments")
    public ResponseEntity<List<PaymentResponseDto>> getMyPayments() {

        return ResponseEntity.ok(
                paymentService.getMyPayments());
    }

    /**
     * Admin Only
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<PaymentResponseDto>> getAllPayments() {

        return ResponseEntity.ok(
                paymentService.getAllPayments());
    }

}