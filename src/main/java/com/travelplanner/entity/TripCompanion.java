package com.travelplanner.entity;

import java.time.LocalDateTime;

import com.travelplanner.enums.Gender;
import com.travelplanner.enums.RelationshipType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "trip_companions")
public class TripCompanion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "companion_id")
    private Long companionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RelationshipType relationship;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Gender gender;

    @Column(nullable = false)
    private Integer age;

    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;

    @Column(length = 100)
    private String email;

    @Column(name = "emergency_contact", length = 15)
    private String emergencyContact;

    @Column(name = "is_trip_owner", nullable = false)
    private Boolean isTripOwner = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}