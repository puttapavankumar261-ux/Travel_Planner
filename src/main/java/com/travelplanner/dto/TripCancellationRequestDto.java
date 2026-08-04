package com.travelplanner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TripCancellationRequestDto {

    @NotBlank(message = "Cancellation reason is required")
    @Size(max = 500, message = "Cancellation reason cannot exceed 500 characters")
    private String reason;

    @NotNull(message = "Cancelled by user ID is required")
    private Long cancelledByUserId;

    @NotBlank(message = "Cancelled by role is required")
    private String cancelledByRole;
}