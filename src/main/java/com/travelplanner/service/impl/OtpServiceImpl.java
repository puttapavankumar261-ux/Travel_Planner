package com.travelplanner.service.impl;

import com.travelplanner.dto.EmailRequestDto;
import com.travelplanner.dto.OtpRequestDto;
import com.travelplanner.dto.OtpVerificationDto;
import com.travelplanner.entity.OtpVerification;
import com.travelplanner.exception.InvalidOtpException;
import com.travelplanner.exception.OtpExpiredException;
import com.travelplanner.repo.OtpRepository;
import com.travelplanner.service.EmailService;
import com.travelplanner.service.OtpService;
import com.travelplanner.util.OtpGenerator;
import com.travelplanner.util.TemplateUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpServiceImpl implements OtpService {

    private final OtpRepository otpRepository;
    private final OtpGenerator otpGenerator;
    private final EmailService emailService;
    private final TemplateUtil templateUtil;

    private static final int OTP_EXPIRY_MINUTES = 5;

    public OtpServiceImpl(OtpRepository otpRepository, OtpGenerator otpGenerator, EmailService emailService, TemplateUtil templateUtil) {
        this.otpRepository = otpRepository;
        this.otpGenerator = otpGenerator;
        this.emailService = emailService;
        this.templateUtil = templateUtil;
    }

    @Override
    public void generateAndSendOtp(OtpRequestDto otpRequestDto) {
        String email = otpRequestDto.getEmail();
        String generatedOtp = otpGenerator.generateOtp();

        Optional<OtpVerification> existingOtpOpt = otpRepository.findByEmailAndPurpose(email, otpRequestDto.getPurpose());
        OtpVerification otpEntity;
        
        if (existingOtpOpt.isPresent()) {
            otpEntity = existingOtpOpt.get();
            otpEntity.setOtp(generatedOtp);
            otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
            otpEntity.setVerified(false);
        } else {
            otpEntity = new OtpVerification(
                    null,
                    email,
                    generatedOtp,
                    otpRequestDto.getPurpose(),
                    LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES),
                    false
            );
        }
        otpRepository.save(otpEntity);

        String emailBody = templateUtil.getOtpEmailTemplate(generatedOtp);
        EmailRequestDto emailRequest = new EmailRequestDto(
                email,
                "Your OTP for Travel Planner",
                emailBody
        );
        
        emailService.sendHtmlEmail(emailRequest);
    }

    @Override
    public boolean verifyOtp(OtpVerificationDto dto) {
        OtpVerification otpEntity = otpRepository.findByEmailAndOtpAndPurpose(dto.getEmail(), dto.getOtp(), dto.getPurpose())
                .orElseThrow(() -> new InvalidOtpException("Invalid email, OTP, or purpose"));

        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new OtpExpiredException("OTP has expired");
        }

        otpEntity.setVerified(true);
        otpRepository.save(otpEntity);
        return true;
    }
}
