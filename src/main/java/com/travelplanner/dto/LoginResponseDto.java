package com.travelplanner.dto;

import java.time.LocalDateTime;
import java.time.LocalDate;

import com.travelplanner.enums.Gender;
import com.travelplanner.enums.RoleName;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDto {
	
	private Long userId;
	private String firstName;
	private String lastName;
	private String email;
	private String mobileNumber;
	private Gender gender;
	private LocalDate dateOfBirth;
	private String country;
	private RoleName roleName;
	private String token;
	private String message;
	private LocalDateTime loginTime;
	
}