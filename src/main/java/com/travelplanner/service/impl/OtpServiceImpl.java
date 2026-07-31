package com.travelplanner.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.travelplanner.common.constants.EmailSubjects;
import com.travelplanner.dto.OtpRequestDto;
import com.travelplanner.dto.OtpVerificationDto;
import com.travelplanner.entity.OtpVerification;
import com.travelplanner.entity.User;
import com.travelplanner.enums.NotificationType;
import com.travelplanner.enums.OtpPurpose;
import com.travelplanner.exception.InvalidOtpException;
import com.travelplanner.exception.OtpExpiredException;
import com.travelplanner.exception.UserNotFoundException;
import com.travelplanner.repo.OtpRepository;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.NotificationService;
import com.travelplanner.service.OtpService;
import com.travelplanner.util.OtpGenerator;
import com.travelplanner.util.TemplateUtil;

@Service
public class OtpServiceImpl implements OtpService {

    private static final int OTP_EXPIRY_MINUTES = 5;

    private final OtpRepository otpRepository;
    private final OtpGenerator otpGenerator;
    private final TemplateUtil templateUtil;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public OtpServiceImpl(
            OtpRepository otpRepository,
            OtpGenerator otpGenerator,
            TemplateUtil templateUtil,
            NotificationService notificationService,
            UserRepository userRepository) {

        this.otpRepository = otpRepository;
        this.otpGenerator = otpGenerator;
        this.templateUtil = templateUtil;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @Override
    public void generateAndSendOtp(OtpRequestDto otpRequestDto) {

        String email = otpRequestDto.getEmail();
        String generatedOtp = otpGenerator.generateOtp();

        Optional<OtpVerification> existingOtpOpt =
                otpRepository.findByEmailAndPurpose(
                        email,
                        otpRequestDto.getPurpose());

        OtpVerification otpEntity;

        if (existingOtpOpt.isPresent()) {

            otpEntity = existingOtpOpt.get();
            otpEntity.setOtp(generatedOtp);
            otpEntity.setExpiryTime(
                    LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
            otpEntity.setVerified(false);
            otpEntity.setVerifiedAt(null);

        } else {

            otpEntity = new OtpVerification();

            otpEntity.setEmail(email);
            otpEntity.setOtp(generatedOtp);
            otpEntity.setPurpose(otpRequestDto.getPurpose());
            otpEntity.setExpiryTime(
                    LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
            otpEntity.setVerified(false);
            otpEntity.setCreatedAt(LocalDateTime.now());
            otpEntity.setVerifiedAt(null);
        }

        otpRepository.save(otpEntity);

        String emailBody = templateUtil.getOtpEmailTemplate(generatedOtp);

        try {
            notificationService.sendNotification(
                    email,
                    EmailSubjects.OTP,
                    emailBody,
                    NotificationType.EMAIL
            );
        } catch (Exception e) {
           e.printStackTrace();
        }
    }

    @Override
    public boolean verifyOtp(OtpVerificationDto dto) {

        OtpVerification otpEntity = otpRepository
                .findByEmailAndOtpAndPurpose(
                        dto.getEmail(),
                        dto.getOtp(),
                        dto.getPurpose())
                .orElseThrow(() ->
                        new InvalidOtpException("Invalid email or OTP"));

        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new OtpExpiredException("OTP has expired");
        }

        if (otpEntity.isVerified()) {
            throw new InvalidOtpException("OTP already verified");
        }

        otpEntity.setVerified(true);
        otpEntity.setVerifiedAt(LocalDateTime.now());

        otpRepository.save(otpEntity);

        // Update user verification status only if the user already exists
        if (dto.getPurpose() == OtpPurpose.REGISTRATION) {

            userRepository.findByEmail(dto.getEmail())
                    .ifPresent(user -> {
                        user.setAccountVerified(true);
                        userRepository.save(user);
                    });
        }

        return true;
    }
}