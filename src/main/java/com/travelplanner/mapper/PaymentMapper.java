package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.PaymentResponseDto;
import com.travelplanner.entity.Payment;

@Component
public class PaymentMapper {

    public PaymentResponseDto toResponseDto(Payment payment) {

        PaymentResponseDto dto = new PaymentResponseDto();

        dto.setPaymentId(payment.getPaymentId());
        dto.setPaymentReference(payment.getPaymentReference());
        dto.setTransactionId(payment.getTransactionId());

        dto.setBookingId(payment.getBooking().getBookingId());

        dto.setUserId(payment.getUser().getUserId());

        dto.setAmount(payment.getAmount());

        dto.setPaymentMethod(payment.getPaymentMethod());

        dto.setPaymentStatus(payment.getPaymentStatus());

        dto.setPaymentDate(payment.getPaymentDate());

        return dto;
    }

}