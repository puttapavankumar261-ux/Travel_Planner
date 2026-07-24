package com.travelplanner.dto;

import java.time.LocalDateTime;

import com.travelplanner.enums.PaymentMethod;
import com.travelplanner.enums.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDto {

    private Long paymentId;

    private String paymentReference;

    private String transactionId;

    private Long bookingId;

    private Long userId;

    private Double amount;

    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    private LocalDateTime paymentDate;

}