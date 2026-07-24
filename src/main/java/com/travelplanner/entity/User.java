package com.travelplanner.entity;

import java.time.LocalDate;
import jakarta.persistence.CascadeType;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;

import com.travelplanner.enums.Gender;
import com.travelplanner.enums.LoginProvider;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "First Name is required")
    @Size(min = 3, max = 30, message = "First Name must contain 3 to 30 characters")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Last Name is required")
    @Size(min = 1, max = 30, message = "Last Name must contain 1 to 30 characters")
    @Column(nullable = false)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid Email Address")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(max = 100, message = "Password exceeds maximum length")
    private String password;

    @NotBlank(message = "Mobile Number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter a valid 10-digit mobile number")
    @Column(nullable = false, unique = true)
    private String mobileNumber;

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Size(max = 50)
    private String country;

    @Size(max = 30)
    private String preferredLanguage;

    @Size(max = 10)
    private String preferredCurrency;

    /*
     * Stores only the image path or URL.
     * Example:
     * uploads/profile/user1.jpg
     * https://cloudinary.com/....
     */
    @Column(length = 500)
    private String profileImage;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    @Column(nullable = false)
    private boolean accountVerified = false;

    @Column(nullable = false)
    private boolean accountEnabled = true;

    @Column(nullable = false)
    private boolean accountLocked = false;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoginProvider loginProvider = LoginProvider.LOCAL;
    
    @OneToMany(mappedBy = "user")
    private List<Booking> bookings = new ArrayList<>();
    
    @OneToMany(mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
 private List<Payment> payments = new ArrayList<>();

}