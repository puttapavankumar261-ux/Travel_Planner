package com.travelplanner.util;

import org.springframework.stereotype.Component;

@Component
public class TemplateUtil {

    public String getOtpEmailTemplate(String otp) {

        return """
        <!DOCTYPE html>
        <html>

        <head>
            <meta charset="UTF-8">
            <title>Travel Planner OTP</title>
        </head>

        <body style="margin:0;
                     padding:0;
                     background:#f4f7fb;
                     font-family:Arial,Helvetica,sans-serif;">

            <table width="100%%" cellpadding="0" cellspacing="0"
                   style="background:#f4f7fb;padding:40px 0;">

                <tr>
                    <td align="center">

                        <table width="600"
                               cellpadding="0"
                               cellspacing="0"
                               style="
                               background:#ffffff;
                               border-radius:12px;
                               overflow:hidden;
                               box-shadow:0 6px 20px rgba(0,0,0,.15);">

                            <!-- Header -->

                            <tr>
                                <td align="center"
                                    style="
                                    background:#0B3D91;
                                    color:white;
                                    padding:30px;">

                                    <h1 style="margin:0;">
                                        ✈ Travel Planner
                                    </h1>

                                    <p style="margin-top:8px;">
                                        Your Smart Travel Companion
                                    </p>

                                </td>
                            </tr>

                            <!-- Body -->

                            <tr>
                                <td style="padding:40px;">

                                    <h2 style="color:#333;">
                                        Hello,
                                    </h2>

                                    <p style="font-size:16px;
                                              color:#555;
                                              line-height:26px;">

                                        We received a request to verify your
                                        email address.
                                        
                                        Please use the OTP below to continue.

                                    </p>

                                    <div
                                    style="
                                    margin:35px auto;
                                    width:220px;
                                    text-align:center;
                                    background:#f3f8ff;
                                    border:2px dashed #0B3D91;
                                    border-radius:10px;
                                    padding:20px;">

                                        <span
                                        style="
                                        font-size:36px;
                                        font-weight:bold;
                                        letter-spacing:8px;
                                        color:#0B3D91;">

                                            %s

                                        </span>

                                    </div>

                                    <p
                                    style="
                                    color:#666;
                                    font-size:15px;">

                                        This OTP is valid for
                                        <strong>5 minutes</strong>.

                                    </p>

                                    <p
                                    style="
                                    color:#666;
                                    font-size:15px;">

                                        Do not share this OTP with anyone.

                                    </p>

                                    <hr style="
                                    border:none;
                                    border-top:1px solid #eee;
                                    margin:30px 0;">

                                    <p
                                    style="
                                    color:#888;
                                    font-size:13px;
                                    line-height:22px;">

                                        If you didn't request this OTP,
                                        you can safely ignore this email.

                                    </p>

                                </td>
                            </tr>

                            <!-- Footer -->

                            <tr>

                                <td
                                align="center"
                                style="
                                background:#f5f5f5;
                                padding:20px;
                                color:#777;
                                font-size:13px;">

                                    © 2026 Travel Planner

                                    <br><br>

                                    Happy Journey ✈

                                </td>

                            </tr>

                        </table>

                    </td>
                </tr>

            </table>

        </body>
        </html>
        """.formatted(otp);
    }
    public String getOtpEmailTemplateTest(String otp) {
        return "<html><body>"
                + "<h2>Your OTP for Travel Planner</h2>"
                + "<p>Please use the following One Time Password (OTP) to complete your request:</p>"
                + "<h3 style='color: blue;'>" + otp + "</h3>"
                + "<p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>"
                + "</body></html>";
    }

    public String getWelcomeEmailTemplate() {
        return "<html><body>"
                + "<h2>Welcome to Travel Planner!</h2>"
                + "<p>We are glad to have you on board.</p>"
                + "</body></html>";
    }
}
