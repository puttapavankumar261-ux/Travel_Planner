package com.travelplanner.service.impl;

import java.io.IOException;
import org.springframework.stereotype.Service;

import com.travelplanner.entity.Trip;
import java.util.List;

import com.travelplanner.dto.report.TripCompleteReportDto;
import com.travelplanner.entity.Accommodation;
import com.travelplanner.entity.Activity;
import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Itinerary;
import com.travelplanner.entity.Transportation;
import com.travelplanner.repo.ItineraryRepository;
import com.travelplanner.exception.TripNotFoundException;
import com.travelplanner.report.TripReportBuilder;
import com.travelplanner.repo.AccommodationRepository;
import com.travelplanner.repo.ActivityRepository;
import com.travelplanner.repo.ExpenseRepository;
import com.travelplanner.repo.TransportationRepository;
import com.travelplanner.repo.TripRepository;
import com.travelplanner.report.ExcelReportGenerator;
import com.travelplanner.report.PdfReportGenerator;
import com.travelplanner.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

	private final TripRepository tripRepository;

	private final ExpenseRepository expenseRepository;

	private final ActivityRepository activityRepository;

	private final AccommodationRepository accommodationRepository;

	private final TransportationRepository transportationRepository;

	private final ItineraryRepository itineraryRepository;

	private final TripReportBuilder tripReportBuilder;

	private final PdfReportGenerator pdfReportGenerator;

	private final ExcelReportGenerator excelReportGenerator;
    
	public ReportServiceImpl(
	        TripRepository tripRepository,
	        ExpenseRepository expenseRepository,
	        ActivityRepository activityRepository,
	        AccommodationRepository accommodationRepository,
	        TransportationRepository transportationRepository,
	        ItineraryRepository itineraryRepository,
	        TripReportBuilder tripReportBuilder,
	        ExcelReportGenerator excelReportGenerator,
	        PdfReportGenerator pdfReportGenerator) {

	    this.tripRepository = tripRepository;
	    this.expenseRepository = expenseRepository;
	    this.activityRepository = activityRepository;
	    this.accommodationRepository = accommodationRepository;
	    this.transportationRepository = transportationRepository;
	    this.itineraryRepository = itineraryRepository;
	    this.tripReportBuilder = tripReportBuilder;
	    this.excelReportGenerator = excelReportGenerator;
	    this.pdfReportGenerator = pdfReportGenerator;
	}

	@Override
	public byte[] generateCompleteTripPdf(Long tripId)
	        throws IOException {

	    TripCompleteReportDto report =
	            buildCompleteReport(tripId);

	    return pdfReportGenerator.generateTripReport(report);
	}

	@Override
	public byte[] generateCompleteTripExcel(Long tripId)
	        throws IOException {

	    TripCompleteReportDto report =
	            buildCompleteReport(tripId);

	    return excelReportGenerator.generateTripReport(report);
	}

	private TripCompleteReportDto buildCompleteReport(Long tripId) {

		Trip trip = tripRepository.findById(tripId)
		        .orElseThrow(() ->
		                new TripNotFoundException(
		                        "Trip not found with ID : " + tripId));

	    List<Expense> expenses =
	            expenseRepository.findByTrip(trip);

	    List<Activity> activities =
	            activityRepository.findByTrip(trip);

	    List<Accommodation> accommodations =
	            accommodationRepository.findByTrip(trip);

	    List<Transportation> transportations =
	            transportationRepository.findByTrip(trip);

	    List<Itinerary> itineraries =
	            itineraryRepository.findByTrip(trip);

	    return tripReportBuilder.buildReport(
	            trip,
	            expenses,
	            activities,
	            accommodations,
	            transportations,
	            itineraries);
	}

}