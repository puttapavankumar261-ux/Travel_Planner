package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.travelplanner.enums.TripStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TripResponseDto {

    private Long tripId;

    private String title;

    private String source;

    private String destination;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double budget;

    private String description;

    private TripStatus tripStatus;

    private Long userId;

    private String userName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}