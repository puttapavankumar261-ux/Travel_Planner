package com.travelplanner.report;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Component;

import com.travelplanner.dto.report.TripCompleteReportDto;

@Component
public class PdfReportGenerator {

    // ===============================================
    // PAGE SETTINGS
    // ===============================================

    private static final float PAGE_MARGIN = 40;

    private static final float PAGE_WIDTH =
            PDRectangle.A4.getWidth();

    private static final float PAGE_HEIGHT =
            PDRectangle.A4.getHeight();

    private static final float TABLE_WIDTH =
            PAGE_WIDTH - (2 * PAGE_MARGIN);

    private static final float ROW_HEIGHT = 22;

    private static final float HEADER_HEIGHT = 28;

    private static final float CELL_PADDING = 5;

    // Fonts

    private final PDType1Font TITLE_FONT =
            new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);

    private final PDType1Font HEADER_FONT =
            new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);

    private final PDType1Font TEXT_FONT =
            new PDType1Font(Standard14Fonts.FontName.HELVETICA);

    private final PDType1Font FOOTER_FONT =
            new PDType1Font(Standard14Fonts.FontName.HELVETICA_OBLIQUE);

    // Current Cursor

    private float yPosition;

    // =======================================================
    // MAIN METHOD
    // =======================================================

    public byte[] generateTripReport(
            TripCompleteReportDto report)
            throws IOException {

        try (PDDocument document = new PDDocument()) {

            PDPage page = new PDPage(PDRectangle.A4);

            document.addPage(page);

            PDPageContentStream content =
                    new PDPageContentStream(document, page);

            yPosition = PAGE_HEIGHT - 50;

            addCoverPage(content, report);

            content = addTripInformation(
                    document,
                    content,
                    report);

            content = addBudgetAnalysis(
                    document,
                    content,
                    report);

            content = addExpenseSummary(
                    document,
                    content,
                    report);
            
            content = addExpenseDetails(
                    document,
                    content,
                    report);

            content.close();

            ByteArrayOutputStream output =
                    new ByteArrayOutputStream();

            document.save(output);

            return output.toByteArray();
        }
    }

    // =======================================================
    // COVER PAGE
    // =======================================================

    private void addCoverPage(
            PDPageContentStream content,
            TripCompleteReportDto report)
            throws IOException {

        // Main Title

        writeCentered(
                content,
                "TRAVEL PLANNER",
                TITLE_FONT,
                26,
                yPosition);

        yPosition -= 40;

        writeCentered(
                content,
                "COMPLETE TRIP REPORT",
                HEADER_FONT,
                18,
                yPosition);

        yPosition -= 20;

        drawHorizontalLine(content);

        yPosition -= 40;

        writeLabelValue(
                content,
                "Trip Name",
                report.getTripTitle());

        writeLabelValue(
                content,
                "Traveller",
                report.getUserName());

        writeLabelValue(
                content,
                "Source",
                report.getSource());

        writeLabelValue(
                content,
                "Destination",
                report.getDestination());

        writeLabelValue(
                content,
                "Start Date",
                String.valueOf(report.getStartDate()));

        writeLabelValue(
                content,
                "End Date",
                String.valueOf(report.getEndDate()));

        writeLabelValue(
                content,
                "Status",
                report.getTripStatus().name());

        yPosition -= 30;

        drawHorizontalLine(content);

        yPosition -= 30;

        writeSimpleText(
                content,
                "Generated On : "
                        + LocalDateTime.now().format(
                                DateTimeFormatter.ofPattern(
                                        "dd-MM-yyyy HH:mm:ss")),
                FOOTER_FONT,
                11,
                PAGE_MARGIN,
                yPosition);

        yPosition -= 40;

        /*
         * PART-1B
         *
         * Next we'll render:
         *
         * Trip Information Table
         * Budget Analysis Table
         */
    }

    // =======================================================
    // BASIC TEXT HELPERS
    // =======================================================

    private void writeCentered(
            PDPageContentStream content,
            String text,
            PDType1Font font,
            int fontSize,
            float y)
            throws IOException {

        float textWidth =
                font.getStringWidth(text) / 1000 * fontSize;

        float x =
                (PAGE_WIDTH - textWidth) / 2;

        content.beginText();
        content.setFont(font, fontSize);
        content.newLineAtOffset(x, y);
        content.showText(text);
        content.endText();
    }

    private void writeSimpleText(
            PDPageContentStream content,
            String text,
            PDType1Font font,
            int fontSize,
            float x,
            float y)
            throws IOException {

        content.beginText();
        content.setFont(font, fontSize);
        content.newLineAtOffset(x, y);
        content.showText(text);
        content.endText();
    }

    private void writeLabelValue(
            PDPageContentStream content,
            String label,
            String value)
            throws IOException {

        writeSimpleText(
                content,
                String.format("%-18s : %s",
                        label,
                        value == null ? "-" : value),
                TEXT_FONT,
                12,
                PAGE_MARGIN,
                yPosition);

        yPosition -= 22;
    }

    private void drawHorizontalLine(
            PDPageContentStream content)
            throws IOException {

        content.moveTo(PAGE_MARGIN, yPosition);
        content.lineTo(PAGE_WIDTH - PAGE_MARGIN, yPosition);
        content.stroke();
    }

    // =======================================================
    // FORMATTING
    // =======================================================

    private String formatCurrency(Double amount) {

        if (amount == null) {
            return "Rs. 0.00";
        }

        return String.format("Rs. %,.2f", amount);
    }
    
 // =======================================================
 // SECTION TITLE
 // =======================================================

 private void drawSectionTitle(
         PDPageContentStream content,
         String title)
         throws IOException {

     yPosition -= 15;

     content.setFont(HEADER_FONT, 15);

     content.beginText();
     content.newLineAtOffset(PAGE_MARGIN, yPosition);
     content.showText(title);
     content.endText();

     yPosition -= 8;

     content.moveTo(PAGE_MARGIN, yPosition);
     content.lineTo(PAGE_WIDTH - PAGE_MARGIN, yPosition);
     content.stroke();

     yPosition -= 20;
 }
 
 private void drawTableHeader(
	        PDPageContentStream content,
	        String leftColumn,
	        String rightColumn)
	        throws IOException {

	    float leftWidth = 180;
	    float rightWidth = TABLE_WIDTH - leftWidth;

	    content.addRect(
	            PAGE_MARGIN,
	            yPosition - ROW_HEIGHT,
	            TABLE_WIDTH,
	            ROW_HEIGHT);

	    content.stroke();

	    content.moveTo(PAGE_MARGIN + leftWidth, yPosition);
	    content.lineTo(
	            PAGE_MARGIN + leftWidth,
	            yPosition - ROW_HEIGHT);

	    content.stroke();

	    writeSimpleText(
	            content,
	            leftColumn,
	            HEADER_FONT,
	            12,
	            PAGE_MARGIN + CELL_PADDING,
	            yPosition - 15);

	    writeSimpleText(
	            content,
	            rightColumn,
	            HEADER_FONT,
	            12,
	            PAGE_MARGIN + leftWidth + CELL_PADDING,
	            yPosition - 15);

	    yPosition -= ROW_HEIGHT;
	}
 
 private void drawTableRow(
	        PDPageContentStream content,
	        String label,
	        String value)
	        throws IOException {

	    float leftWidth = 180;

	    content.addRect(
	            PAGE_MARGIN,
	            yPosition - ROW_HEIGHT,
	            TABLE_WIDTH,
	            ROW_HEIGHT);

	    content.stroke();

	    content.moveTo(
	            PAGE_MARGIN + leftWidth,
	            yPosition);

	    content.lineTo(
	            PAGE_MARGIN + leftWidth,
	            yPosition - ROW_HEIGHT);

	    content.stroke();

	    writeSimpleText(
	            content,
	            label,
	            TEXT_FONT,
	            11,
	            PAGE_MARGIN + CELL_PADDING,
	            yPosition - 15);

	    writeSimpleText(
	            content,
	            value == null ? "-" : value,
	            TEXT_FONT,
	            11,
	            PAGE_MARGIN + leftWidth + CELL_PADDING,
	            yPosition - 15);

	    yPosition -= ROW_HEIGHT;
	}
 private void drawTableHeader(
	        PDPageContentStream content,
	        String[] headers,
	        float[] columnWidths)
	        throws IOException {

	    float x = PAGE_MARGIN;

	    for (int i = 0; i < headers.length; i++) {

	        content.addRect(
	                x,
	                yPosition - ROW_HEIGHT,
	                columnWidths[i],
	                ROW_HEIGHT);

	        content.stroke();

	        writeSimpleText(
	                content,
	                headers[i],
	                HEADER_FONT,
	                10,
	                x + CELL_PADDING,
	                yPosition - 15);

	        x += columnWidths[i];
	    }

	    yPosition -= ROW_HEIGHT;
	}
 
 private void drawTableRow(
	        PDPageContentStream content,
	        String[] values,
	        float[] columnWidths)
	        throws IOException {

	    float x = PAGE_MARGIN;

	    for (int i = 0; i < values.length; i++) {

	        content.addRect(
	                x,
	                yPosition - ROW_HEIGHT,
	                columnWidths[i],
	                ROW_HEIGHT);

	        content.stroke();

	        writeSimpleText(
	                content,
	                values[i] == null ? "-" : values[i],
	                TEXT_FONT,
	                10,
	                x + CELL_PADDING,
	                yPosition - 15);

	        x += columnWidths[i];
	    }

	    yPosition -= ROW_HEIGHT;
	}
 
 private PDPageContentStream addTripInformation(
	        PDDocument document,
	        PDPageContentStream content,
	        TripCompleteReportDto report)
	        throws IOException{
	 
	 content = checkPageBreak(document, content);

	    drawSectionTitle(content, "Trip Information");

	    drawTableHeader(content, "Field", "Value");

	    drawTableRow(content,
	            "Trip ID",
	            String.valueOf(report.getTripId()));

	    drawTableRow(content,
	            "Trip Name",
	            report.getTripTitle());

	    drawTableRow(content,
	            "Traveller",
	            report.getUserName());

	    drawTableRow(content,
	            "Source",
	            report.getSource());

	    drawTableRow(content,
	            "Destination",
	            report.getDestination());

	    drawTableRow(content,
	            "Start Date",
	            String.valueOf(report.getStartDate()));

	    drawTableRow(content,
	            "End Date",
	            String.valueOf(report.getEndDate()));

	    drawTableRow(content,
	            "Status",
	            report.getTripStatus().name());

	    drawTableRow(content,
	            "Description",
	            report.getDescription());

	    yPosition -= 20;
	    
	    return content;
	}
 
 private PDPageContentStream addBudgetAnalysis(
	        PDDocument document,
	        PDPageContentStream content,
	        TripCompleteReportDto report)
	        throws IOException  {
	 content = checkPageBreak(document, content);

	    drawSectionTitle(content, "Budget Analysis");

	    drawTableHeader(content,
	            "Description",
	            "Amount");

	    drawTableRow(
	            content,
	            "Planned Budget",
	            formatCurrency(
	                    report.getBudgetAnalysis()
	                            .getPlannedBudget()));

	    drawTableRow(
	            content,
	            "Estimated Cost",
	            formatCurrency(
	                    report.getBudgetAnalysis()
	                            .getEstimatedCost()));

	    drawTableRow(
	            content,
	            "Actual Expense",
	            formatCurrency(
	                    report.getBudgetAnalysis()
	                            .getActualExpense()));

	    drawTableRow(
	            content,
	            "Remaining Budget",
	            formatCurrency(
	                    report.getBudgetAnalysis()
	                            .getRemainingBudget()));

	    drawTableRow(
	            content,
	            "Budget Utilization",
	            String.format(
	                    "%.2f%%",
	                    report.getBudgetAnalysis()
	                            .getBudgetUtilization()));

	    drawTableRow(
	            content,
	            "Budget Status",
	            report.getBudgetAnalysis()
	                    .getBudgetStatus());

	    yPosition -= 20;

	    return content;
	    
	}
 
 private PDPageContentStream addExpenseSummary(
	        PDDocument document,
	        PDPageContentStream content,
	        TripCompleteReportDto report)
	        throws IOException {

	    content = checkPageBreak(document, content);

	    drawSectionTitle(content, "Expense Category Summary");

	    String[] headers = {
	            "Category",
	            "Amount"
	    };

	    float[] columnWidths = {
	            250,
	            TABLE_WIDTH - 250
	    };

	    drawTableHeader(
	            content,
	            headers,
	            columnWidths);

	    if (report.getExpenseSummary() != null
	            && !report.getExpenseSummary().isEmpty()) {

	        for (var expense : report.getExpenseSummary()) {

	            drawTableRow(
	                    content,
	                    new String[]{
	                            expense.getCategory().name(),
	                            formatCurrency(expense.getAmount())
	                    },
	                    columnWidths);
	        }

	    } else {

	        drawTableRow(
	                content,
	                new String[]{
	                        "No Expense Data",
	                        "-"
	                },
	                columnWidths);
	    }

	    yPosition -= 20;

	    return content;
	}
 
//=======================================================
//EXPENSE DETAILS
//=======================================================

private PDPageContentStream addExpenseDetails(
      PDDocument document,
      PDPageContentStream content,
      TripCompleteReportDto report)
      throws IOException {

  content = checkPageBreak(document, content);

  drawSectionTitle(content, "Detailed Expense Register");

  String[] headers = {
          "Date",
          "Title",
          "Category",
          "Payment",
          "Amount"
  };

  float[] columnWidths = {
          70,
          150,
          100,
          100,
          TABLE_WIDTH - 420
  };

  drawTableHeader(
          content,
          headers,
          columnWidths);

  if (report.getExpenses() != null
          && !report.getExpenses().isEmpty()) {

      for (var expense : report.getExpenses()) {

          content = checkPageBreak(document, content);

          drawTableRow(
                  content,
                  new String[]{

                          String.valueOf(expense.getExpenseDate()),

                          expense.getExpenseTitle(),

                          expense.getCategory().name(),

                          expense.getPaymentMethod().name(),

                          formatCurrency(expense.getAmount())

                  },
                  columnWidths);
      }

  } else {

      drawTableRow(
              content,
              new String[]{
                      "-",
                      "No Expense Data",
                      "-",
                      "-",
                      "-"
              },
              columnWidths);
  }

  yPosition -= 20;

  return content;
}
 
 private PDPageContentStream checkPageBreak(
	        PDDocument document,
	        PDPageContentStream content)
	        throws IOException {

	    if (yPosition > 80) {
	        return content;
	    }

	    content.close();

	    PDPage newPage = new PDPage(PDRectangle.A4);

	    document.addPage(newPage);

	    content = new PDPageContentStream(document, newPage);

	    yPosition = PAGE_HEIGHT - 50;

	    return content;
	}

}