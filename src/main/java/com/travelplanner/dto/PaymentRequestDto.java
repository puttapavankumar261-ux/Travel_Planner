package com.travelplanner.dto;

import com.travelplanner.enums.PaymentMethod;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDto {

    @NotNull(message = "Booking Id is required")
    private Long bookingId;

    @NotNull(message = "Payment Method is required")
    private PaymentMethod paymentMethod;

}