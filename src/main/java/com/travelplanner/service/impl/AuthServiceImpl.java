package com.travelplanner.service.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.travelplanner.dto.LoginRequestDto;
import com.travelplanner.dto.LoginResponseDto;
import com.travelplanner.dto.LogoutResponseDto;
import com.travelplanner.entity.User;
import com.travelplanner.exception.AccountDisabledException;
import com.travelplanner.exception.AccountLockedException;
import com.travelplanner.exception.InvalidCredentialsException;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepo;

    public AuthServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public LoginResponseDto login(LoginRequestDto request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        if (!user.isAccountEnabled()) {
            throw new AccountDisabledException("Your account has been disabled.");
        }

        if (user.isAccountLocked()) {
            throw new AccountLockedException("Your account has been locked.");
        }

        return new LoginResponseDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().getRoleName(),
                "Login Successful",
                LocalDateTime.now()
        );
    }

    @Override
    public LogoutResponseDto logout() {

        return new LogoutResponseDto("Logout Successful");
    }

}