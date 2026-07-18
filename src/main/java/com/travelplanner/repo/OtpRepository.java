package com.travelplanner.repo;

import com.travelplanner.entity.OtpVerification;
import com.travelplanner.enums.OtpPurpose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findByEmailAndOtpAndPurpose(String email, String otp, OtpPurpose purpose);

    Optional<OtpVerification> findByEmailAndPurpose(String email, OtpPurpose purpose);

}
