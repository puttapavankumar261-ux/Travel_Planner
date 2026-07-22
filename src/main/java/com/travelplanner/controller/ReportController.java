package com.travelplanner.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelplanner.service.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private static final Logger logger =
            LoggerFactory.getLogger(ReportController.class);

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // ==========================================================
    // DOWNLOAD COMPLETE TRIP PDF REPORT
    // ==========================================================

    @GetMapping("/trip/{tripId}/pdf")
    public ResponseEntity<byte[]> downloadTripPdf(
            @PathVariable Long tripId)
            throws IOException {

        logger.info("Downloading PDF Report for Trip ID : {}", tripId);

        byte[] pdf =
                reportService.generateCompleteTripPdf(tripId);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_PDF);

        headers.setContentDisposition(
                ContentDisposition.attachment()
                        .filename("Trip_Report_" + tripId + ".pdf")
                        .build());

        headers.setContentLength(pdf.length);

        logger.info("PDF Report generated successfully for Trip ID : {}",
                tripId);

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdf);
    }

    // ==========================================================
    // DOWNLOAD COMPLETE TRIP EXCEL REPORT
    // ==========================================================

    @GetMapping("/trip/{tripId}/excel")
    public ResponseEntity<byte[]> downloadTripExcel(
            @PathVariable Long tripId)
            throws IOException {

        logger.info("Downloading Excel Report for Trip ID : {}", tripId);

        byte[] excel =
                reportService.generateCompleteTripExcel(tripId);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(
                MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

        headers.setContentDisposition(
                ContentDisposition.attachment()
                        .filename("Trip_Report_" + tripId + ".xlsx")
                        .build());

        headers.setContentLength(excel.length);

        logger.info("Excel Report generated successfully for Trip ID : {}",
                tripId);

        return ResponseEntity.ok()
                .headers(headers)
                .body(excel);
    }

}