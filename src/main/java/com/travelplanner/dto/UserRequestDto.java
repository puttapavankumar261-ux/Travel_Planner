package com.travelplanner.dto;

import java.time.LocalDate;

import com.travelplanner.enums.Gender;
import com.travelplanner.enums.LoginProvider;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

	private LoginProvider loginProvider;
	
    @NotBlank(message = "First Name is required")
    @Size(min = 3, max = 30,
            message = "First Name should contain 3 to 30 characters")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    @Size(min = 1, max = 30,
            message = "Last Name should contain 1 to 30 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid Email Address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 20,
            message = "Password should contain 8 to 20 characters")
    private String password;

    @NotBlank(message = "Mobile Number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter a valid 10-digit mobile number")
    private String mobileNumber;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Preferred Language is required")
    private String preferredLanguage;

    @NotBlank(message = "Preferred Currency is required")
    private String preferredCurrency;

    @NotNull(message = "Role ID is required")
    private Long roleId;

}