package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.PaymentRequestDto;
import com.travelplanner.dto.PaymentResponseDto;

public interface PaymentService {

    PaymentResponseDto makePayment(PaymentRequestDto dto);

    PaymentResponseDto getPaymentById(Long paymentId);

    PaymentResponseDto getPaymentByBookingId(Long bookingId);

    List<PaymentResponseDto> getMyPayments();

    List<PaymentResponseDto> getAllPayments();

}