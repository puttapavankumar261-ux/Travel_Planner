package com.travelplanner.service.impl;
import com.travelplanner.exception.AccountNotVerifiedException;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.dto.LoginRequestDto;
import com.travelplanner.dto.LoginResponseDto;
import com.travelplanner.dto.LogoutResponseDto;
import com.travelplanner.entity.User;
import com.travelplanner.exception.AccountDisabledException;
import com.travelplanner.exception.AccountLockedException;
import com.travelplanner.exception.InvalidCredentialsException;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.security.jwt.JwtService;
import com.travelplanner.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger =
            LoggerFactory.getLogger(AuthServiceImpl.class);
    private final JwtService jwtService;
    

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    public AuthServiceImpl(UserRepository userRepo,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

             this.userRepo = userRepo;
             this.passwordEncoder = passwordEncoder;
             this.jwtService = jwtService;
    }

    @Override
    public LoginResponseDto login(LoginRequestDto request) {

        logger.info("Login attempt for email: {}", request.getEmail());

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> {

                    logger.warn("Login failed. User not found with email: {}",
                            request.getEmail());

                    return new InvalidCredentialsException(
                            ApiMessages.INVALID_CREDENTIALS);
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            logger.warn("Login failed. Invalid password for email: {}",
                    request.getEmail());

            throw new InvalidCredentialsException(
                    ApiMessages.INVALID_CREDENTIALS);
        }

        if (!user.isAccountEnabled()) {

            logger.warn("Login failed. Account disabled for email: {}",
                    request.getEmail());

            throw new AccountDisabledException(
                    ApiMessages.ACCOUNT_DISABLED);
        }

        if (user.isAccountLocked()) {

            logger.warn("Login failed. Account locked for email: {}",
                    request.getEmail());

            throw new AccountLockedException(
                    ApiMessages.ACCOUNT_LOCKED);
        }

        // NEW: Check email verification
        if (!user.isAccountVerified()) {

            logger.warn("Login failed. Email not verified for: {}",
                    request.getEmail());

            throw new AccountNotVerifiedException(
                    ApiMessages.ACCOUNT_NOT_VERIFIED);
        }

        logger.info("Login successful for user ID: {}",
                user.getUserId());

        // Generate JWT Token
        String token = jwtService.generateToken(user);

        return new LoginResponseDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().getRoleName(),
                token,
                ApiMessages.LOGIN_SUCCESS,
                LocalDateTime.now()
        );
    }

    @Override
    public LogoutResponseDto logout() {

        logger.info("User logged out successfully.");

        return new LogoutResponseDto(
                ApiMessages.LOGOUT_SUCCESS);
    }

}