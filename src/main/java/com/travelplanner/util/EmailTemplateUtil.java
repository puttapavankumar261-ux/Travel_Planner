package com.travelplanner.util;

import java.time.format.DateTimeFormatter;

import com.travelplanner.entity.Trip;
import com.travelplanner.entity.User;

public final class EmailTemplateUtil {

    private EmailTemplateUtil() {
    }

    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("dd MMM yyyy");

    public static String tripCreated(User user, Trip trip) {

        return """
                <!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8">
                    <title>Trip Created Successfully</title>
                </head>

                <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

                    <table width="100%%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px;">
                        <tr>
                            <td align="center">

                                <table width="650" cellpadding="0" cellspacing="0"
                                       style="background:#ffffff;border-radius:10px;overflow:hidden;">

                                    <!-- Header -->
                                    <tr>
                                        <td style="background:#1976d2;color:white;padding:25px;text-align:center;">
                                            <h1 style="margin:0;">
                                                ✈ Travel Planner
                                            </h1>
                                            <p style="margin-top:10px;">
                                                Your Journey Begins Here
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- Greeting -->
                                    <tr>
                                        <td style="padding:30px;">

                                            <h2>Hello %s 👋</h2>

                                            <p>
                                                Your trip has been created successfully.
                                                Below are your trip details.
                                            </p>

                                            <table
                                                width="100%%"
                                                cellpadding="10"
                                                cellspacing="0"
                                                style="border-collapse:collapse;margin-top:20px;">

                                                <tr style="background:#f7f7f7;">
                                                    <td><strong>Trip Title</strong></td>
                                                    <td>%s</td>
                                                </tr>

                                                <tr>
                                                    <td><strong>Source</strong></td>
                                                    <td>%s</td>
                                                </tr>

                                                <tr style="background:#f7f7f7;">
                                                    <td><strong>Destination</strong></td>
                                                    <td>%s</td>
                                                </tr>

                                                <tr>
                                                    <td><strong>Start Date</strong></td>
                                                    <td>%s</td>
                                                </tr>

                                                <tr style="background:#f7f7f7;">
                                                    <td><strong>End Date</strong></td>
                                                    <td>%s</td>
                                                </tr>

                                                <tr>
                                                    <td><strong>Budget</strong></td>
                                                    <td>₹ %.2f</td>
                                                </tr>

                                                <tr style="background:#f7f7f7;">
                                                    <td><strong>Status</strong></td>
                                                    <td>%s</td>
                                                </tr>

                                            </table>

                                            <br>

                                            <p>
                                                We wish you a wonderful and safe journey.
                                            </p>

                                            <p>
                                                Thank you for choosing
                                                <strong>Travel Planner</strong>.
                                            </p>

                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td
                                            style="background:#eeeeee;
                                                   padding:20px;
                                                   text-align:center;
                                                   font-size:13px;
                                                   color:#666;">

                                            © 2026 Travel Planner

                                            <br><br>

                                            This is an automated email.
                                            Please do not reply.

                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>

                </body>

                </html>
                """
                .formatted(
                        user.getFirstName(),
                        trip.getTitle(),
                        trip.getSource(),
                        trip.getDestination(),
                        trip.getStartDate().format(DATE_FORMATTER),
                        trip.getEndDate().format(DATE_FORMATTER),
                        trip.getBudget(),
                        trip.getTripStatus());
    }

}