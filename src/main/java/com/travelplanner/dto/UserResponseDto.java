package com.travelplanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.travelplanner.enums.Gender;
import com.travelplanner.enums.RoleName;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private Long userId;

    private String firstName;

    private String lastName;

    private String email;

    private String mobileNumber;

    private LocalDate dateOfBirth;

    private Gender gender;

    private String country;

    private String preferredLanguage;

    private String preferredCurrency;

    private String profileImage;

    private RoleName roleName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}