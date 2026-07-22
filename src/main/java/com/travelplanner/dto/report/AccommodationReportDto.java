package com.travelplanner.dto.report;

import java.time.LocalDate;

import com.travelplanner.enums.AccommodationType;
import com.travelplanner.enums.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationReportDto {

    private String hotelName;

    private AccommodationType accommodationType;

    private String hotelAddress;

    private String city;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private String roomType;

    private BookingStatus bookingStatus;

    private Double bookingAmount;

    private String bookingReference;

}