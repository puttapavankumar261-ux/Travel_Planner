package com.travelplanner.service;

import java.io.IOException;

public interface ReportService {

    byte[] generateCompleteTripPdf(Long tripId)
            throws IOException;

    byte[] generateCompleteTripExcel(Long tripId)
            throws IOException;

}