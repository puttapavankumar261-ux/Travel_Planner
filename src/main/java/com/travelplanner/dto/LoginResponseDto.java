package com.travelplanner.dto;

import java.time.LocalDateTime;

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
	private RoleName roleName;
	private String token;
	private String message;
	private LocalDateTime loginTime;
	
}