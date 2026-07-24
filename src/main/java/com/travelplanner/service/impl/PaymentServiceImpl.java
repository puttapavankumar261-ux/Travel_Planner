package com.travelplanner.service.impl;

import java.time.Year;
import java.util.List;
import java.util.UUID;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.travelplanner.dto.PaymentRequestDto;
import com.travelplanner.dto.PaymentResponseDto;
import com.travelplanner.entity.Booking;
import com.travelplanner.entity.Payment;
import com.travelplanner.entity.User;
import com.travelplanner.enums.BookingStatus;
import com.travelplanner.enums.PaymentStatus;
import com.travelplanner.enums.RoleName;
import com.travelplanner.exception.BookingNotFoundException;
import com.travelplanner.exception.DuplicatePaymentException;
import com.travelplanner.exception.PaymentNotFoundException;
import com.travelplanner.exception.UserNotFoundException;
import com.travelplanner.mapper.PaymentMapper;
import com.travelplanner.repo.BookingRepository;
import com.travelplanner.repo.PaymentRepository;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final PaymentMapper paymentMapper;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository,
            UserRepository userRepository,
            PaymentMapper paymentMapper) {

        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.paymentMapper = paymentMapper;
    }

    @Override
    public PaymentResponseDto makePayment(PaymentRequestDto dto) {

        User loggedInUser = getAuthenticatedUser();

        Booking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() ->
                        new BookingNotFoundException("Booking not found"));

        // Verify booking ownership
        if (!booking.getUser().getUserId()
                .equals(loggedInUser.getUserId())) {

            throw new AccessDeniedException(
                    "You are not authorized to pay for this booking.");
        }

        // Prevent duplicate payments
        if (paymentRepository.findByBookingBookingId(
                booking.getBookingId()).isPresent()) {

            throw new DuplicatePaymentException(
                    "Payment already exists for this booking.");
        }

        Payment payment = new Payment();

        payment.setPaymentReference(generatePaymentReference());

        payment.setTransactionId(generateTransactionId());

        payment.setUser(loggedInUser);

        payment.setBooking(booking);

        payment.setAmount(booking.getAmount());

        payment.setPaymentMethod(dto.getPaymentMethod());

        payment.setPaymentStatus(PaymentStatus.SUCCESS);

        Payment savedPayment = paymentRepository.save(payment);

        // Update booking status after successful payment
        booking.setBookingStatus(BookingStatus.BOOKED);

        bookingRepository.save(booking);

        return paymentMapper.toResponseDto(savedPayment);
    }

    /**
     * Returns the currently authenticated user.
     */
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "Authenticated user not found"));
    }

    /**
     * Generates Payment Reference.
     * Example : TPP-2026-000001
     */
    private String generatePaymentReference() {

        long count = paymentRepository.count() + 1;

        return "TPP-"
                + Year.now().getValue()
                + "-"
                + String.format("%06d", count);
    }

    /**
     * Generates unique transaction id.
     */
    private String generateTransactionId() {

        return UUID.randomUUID().toString();
    }
    
    @Override
    public PaymentResponseDto getPaymentById(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new PaymentNotFoundException("Payment not found"));

        validatePaymentAccess(payment);

        return paymentMapper.toResponseDto(payment);
    }

    @Override
    public PaymentResponseDto getPaymentByBookingId(Long bookingId) {

        Payment payment = paymentRepository.findByBookingBookingId(bookingId)
                .orElseThrow(() ->
                        new PaymentNotFoundException(
                                "Payment not found for this booking"));

        validatePaymentAccess(payment);

        return paymentMapper.toResponseDto(payment);
    }

    @Override
    public List<PaymentResponseDto> getMyPayments() {

        User loggedInUser = getAuthenticatedUser();

        return paymentRepository.findByUserUserId(loggedInUser.getUserId())
                .stream()
                .map(paymentMapper::toResponseDto)
                .toList();
    }

    @Override
    public List<PaymentResponseDto> getAllPayments() {

        return paymentRepository.findAll()
                .stream()
                .map(paymentMapper::toResponseDto)
                .toList();
    }

    /**
     * Validates whether the logged-in user can access the payment.
     * Only the payment owner or an ADMIN can access it.
     */
    private void validatePaymentAccess(Payment payment) {

        User loggedInUser = getAuthenticatedUser();

        boolean isOwner = payment.getUser()
                .getUserId()
                .equals(loggedInUser.getUserId());

        boolean isAdmin =
                loggedInUser.getRole() != null &&
                		RoleName.ADMIN.equals(loggedInUser.getRole().getRoleName());

        if (!isOwner && !isAdmin) {

            throw new AccessDeniedException(
                    "You are not authorized to access this payment.");
        }
    }

}