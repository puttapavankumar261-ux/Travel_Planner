package com.travelplanner.report;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import com.travelplanner.dto.report.TripCompleteReportDto;

@Component
public class ExcelReportGenerator {

	public byte[] generateTripReport(
	        TripCompleteReportDto report)
	        throws IOException{

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Trip Report");

            int rowNum = 0;

            // Title
            Row titleRow = sheet.createRow(rowNum++);
            titleRow.createCell(0).setCellValue("Travel Planner");
            titleRow.createCell(1).setCellValue("Trip Report");

            rowNum++;

            // Trip Information
            rowNum = createSectionHeader(sheet, rowNum, "Trip Information");

            rowNum = createRow(sheet, rowNum, "Trip ID",
                    String.valueOf(report.getTripId()));

            rowNum = createRow(sheet, rowNum, "Title",
                    report.getTripTitle());

            rowNum = createRow(sheet, rowNum, "User",
                    report.getUserName());

            rowNum = createRow(sheet, rowNum, "Source",
                    report.getSource());

            rowNum = createRow(sheet, rowNum, "Destination",
                    report.getDestination());

            rowNum = createRow(sheet, rowNum, "Start Date",
                    String.valueOf(report.getStartDate()));

            rowNum = createRow(sheet, rowNum, "End Date",
                    String.valueOf(report.getEndDate()));

            rowNum = createRow(sheet, rowNum, "Status",
                    report.getTripStatus().name());

            rowNum++;

            // Budget Summary
            rowNum = createSectionHeader(sheet, rowNum, "Budget Summary");

            rowNum = createRow(sheet, rowNum,
                    "Planned Budget",
                    String.valueOf(report.getBudgetAnalysis().getPlannedBudget()));

            rowNum = createRow(sheet, rowNum,
                    "Estimated Cost",
                    String.valueOf(report.getBudgetAnalysis().getEstimatedCost()));

            rowNum = createRow(sheet, rowNum,
                    "Actual Expense",
                    String.valueOf(report.getBudgetAnalysis().getActualExpense()));

            rowNum = createRow(sheet, rowNum,
                    "Remaining Budget",
                    String.valueOf(report.getBudgetAnalysis().getRemainingBudget()));

            rowNum = createRow(sheet, rowNum,
                    "Budget Utilization",
                    report.getBudgetAnalysis().getBudgetUtilization() + "%");

            rowNum = createRow(sheet, rowNum,
                    "Budget Status",
                    String.valueOf(report.getBudgetAnalysis().getBudgetStatus()));

            rowNum++;

            // Booking Summary
         // Booking Summary
            rowNum = createSectionHeader(sheet, rowNum, "Booking Summary");

            rowNum = createRow(sheet, rowNum,
                    "Total Activities",
                    String.valueOf(
                            report.getActivities() == null
                                    ? 0
                                    : report.getActivities().size()));

            rowNum = createRow(sheet, rowNum,
                    "Accommodation Bookings",
                    String.valueOf(
                            report.getAccommodations() == null
                                    ? 0
                                    : report.getAccommodations().size()));

            rowNum = createRow(sheet, rowNum,
                    "Transportation Bookings",
                    String.valueOf(
                            report.getTransportations() == null
                                    ? 0
                                    : report.getTransportations().size()));

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);

            workbook.write(outputStream);

            return outputStream.toByteArray();
        }
    }

    private int createSectionHeader(
            Sheet sheet,
            int rowNum,
            String title) {

        Row row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue(title);

        return rowNum;
    }

    private int createRow(
            Sheet sheet,
            int rowNum,
            String key,
            String value) {

        Row row = sheet.createRow(rowNum++);

        row.createCell(0).setCellValue(key);
        row.createCell(1).setCellValue(value);

        return rowNum;
    }

}