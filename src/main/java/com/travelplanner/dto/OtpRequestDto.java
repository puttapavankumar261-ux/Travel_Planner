package com.travelplanner.dto;

import com.travelplanner.enums.OtpPurpose;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OtpRequestDto {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "OTP purpose is required")
    private OtpPurpose purpose;

    // Manual constructor and getters/setters to fix Eclipse Red Lines
    public OtpRequestDto() {}

    public OtpRequestDto(String email, OtpPurpose purpose) {
        this.email = email;
        this.purpose = purpose;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public OtpPurpose getPurpose() { return purpose; }
    public void setPurpose(OtpPurpose purpose) { this.purpose = purpose; }
}
