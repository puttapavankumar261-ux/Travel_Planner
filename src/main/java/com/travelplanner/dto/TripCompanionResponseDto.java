package com.travelplanner.dto;

import com.travelplanner.enums.Gender;
import com.travelplanner.enums.RelationshipType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TripCompanionResponseDto {

    private Long companionId;

    private Long tripId;

    private String firstName;

    private String lastName;

    private RelationshipType relationship;

    private Gender gender;

    private Integer age;

    private String mobileNumber;

    private String email;

    private String emergencyContact;

    private Boolean isTripOwner;
}