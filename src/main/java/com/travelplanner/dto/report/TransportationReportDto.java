package com.travelplanner.dto.report;

import java.time.LocalDate;
import java.time.LocalTime;

import com.travelplanner.enums.TransportStatus;
import com.travelplanner.enums.TransportType;
import com.travelplanner.enums.TravelClass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransportationReportDto {

    private TransportType transportType;

    private String providerName;

    private String source;

    private String destination;

    private LocalDate departureDate;

    private LocalTime departureTime;

    private LocalDate arrivalDate;

    private LocalTime arrivalTime;

    private TravelClass travelClass;

    private String seatNumber;

    private String ticketNumber;

    private Double fare;

    private TransportStatus transportStatus;

}