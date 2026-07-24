package com.travelplanner.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import com.travelplanner.dto.UserRequestDto;
import com.travelplanner.dto.UserResponseDto;
import com.travelplanner.entity.Role;
import com.travelplanner.entity.User;
import com.travelplanner.exception.RoleNotFoundException;
import com.travelplanner.exception.UserAlreadyExistsException;
import com.travelplanner.exception.UserNotFoundException;
import com.travelplanner.mapper.UserMapper;
import com.travelplanner.repo.RoleRepository;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.travelplanner.dto.OtpRequestDto;
import com.travelplanner.enums.OtpPurpose;
import com.travelplanner.service.OtpService;

import com.travelplanner.common.constants.ApiMessages;
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final UserMapper userMapper;
    private static final Logger logger =
            LoggerFactory.getLogger(UserServiceImpl.class);
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    public UserServiceImpl(UserRepository userRepo,
            RoleRepository roleRepo,
            UserMapper userMapper,
            PasswordEncoder passwordEncoder,
            OtpService otpService) {

        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.otpService = otpService;
    }

    @Override
    public UserResponseDto registerUser(UserRequestDto request) {

        logger.info("Registering user with email: {}", request.getEmail());

        if (userRepo.existsByEmail(request.getEmail())) {

            logger.warn("Registration failed. Email already exists: {}",
                    request.getEmail());

            throw new UserAlreadyExistsException("Email already exists.");
        }

        if (userRepo.existsByMobileNumber(request.getMobileNumber())) {

            logger.warn("Registration failed. Mobile number already exists: {}",
                    request.getMobileNumber());

            throw new UserAlreadyExistsException("Mobile Number already exists.");
        }

        Role role = roleRepo.findById(request.getRoleId())
                .orElseThrow(() -> {

                    logger.warn("Role not found with ID: {}",
                            request.getRoleId());

                    return new RoleNotFoundException(
                            "Role not found with ID : " + request.getRoleId());
                });

        User user = userMapper.mapToUser(request, role);

        // Encrypt Password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // New users must verify their email
        user.setAccountVerified(false);

        User savedUser = userRepo.save(user);

        logger.info("User registered successfully with ID: {}",
                savedUser.getUserId());

        // Generate and send OTP automatically
        OtpRequestDto otpRequest = new OtpRequestDto();
        otpRequest.setEmail(savedUser.getEmail());
        otpRequest.setPurpose(OtpPurpose.REGISTRATION);

        otpService.generateAndSendOtp(otpRequest);

        logger.info("Verification OTP sent successfully to {}",
                savedUser.getEmail());

        return userMapper.mapToUserResponse(savedUser);
    }

    @Override
    public UserResponseDto getUserById(Long userId) {

        logger.info("Fetching user with ID: {}", userId);

        User user = userRepo.findById(userId)
                .orElseThrow(() -> {

                    logger.warn("User not found with ID: {}", userId);

                    return new UserNotFoundException(
                            "User not found with ID : " + userId);
                });

        return userMapper.mapToUserResponse(user);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {

        logger.info("Fetching all users.");

        return userRepo.findAll()
                .stream()
                .map(userMapper::mapToUserResponse)
                .toList();
    }

    @Override
    public UserResponseDto updateUser(Long userId, UserRequestDto request) {

        logger.info("Updating user with ID: {}", userId);

        User existingUser = userRepo.findById(userId)
                .orElseThrow(() -> {

                    logger.warn("User not found with ID: {}", userId);

                    return new UserNotFoundException(
                            "User not found with ID : " + userId);
                });

        if (!existingUser.getEmail().equals(request.getEmail())
                && userRepo.existsByEmail(request.getEmail())) {

            logger.warn("Email already exists: {}", request.getEmail());

            throw new UserAlreadyExistsException("Email already exists.");
        }

        if (!existingUser.getMobileNumber().equals(request.getMobileNumber())
                && userRepo.existsByMobileNumber(request.getMobileNumber())) {

            logger.warn("Mobile number already exists: {}",
                    request.getMobileNumber());

            throw new UserAlreadyExistsException(
                    "Mobile Number already exists.");
        }

        Role role = roleRepo.findById(request.getRoleId())
                .orElseThrow(() -> {

                    logger.warn("Role not found with ID: {}",
                            request.getRoleId());

                    return new RoleNotFoundException(
                            "Role not found with ID : " + request.getRoleId());
                });

        existingUser.setFirstName(request.getFirstName());
        existingUser.setLastName(request.getLastName());
        existingUser.setEmail(request.getEmail());
        existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        existingUser.setMobileNumber(request.getMobileNumber());
        existingUser.setDateOfBirth(request.getDateOfBirth());
        existingUser.setGender(request.getGender());
        existingUser.setCountry(request.getCountry());
        existingUser.setPreferredLanguage(request.getPreferredLanguage());
        existingUser.setPreferredCurrency(request.getPreferredCurrency());
        existingUser.setRole(role);

        User updatedUser = userRepo.save(existingUser);

        logger.info("User updated successfully with ID: {}", userId);

        return userMapper.mapToUserResponse(updatedUser);
    }
    @Override
    public void deleteUser(Long userId) {

        logger.info("Deleting user with ID: {}", userId);

        User user = userRepo.findById(userId)
                .orElseThrow(() -> {

                    logger.warn("User not found with ID: {}", userId);

                    return new UserNotFoundException(
                            "User not found with ID : " + userId);
                });

        userRepo.delete(user);

        logger.info("User deleted successfully with ID: {}", userId);
    }
    
    @Override
    public void updatePassword(String email, String newPassword) {

        logger.info("Updating password for email: {}", email);

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> {

                    logger.warn("User not found with email: {}", email);

                    return new UserNotFoundException(
                            "User not found with email : " + email);
                });

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepo.save(user);

        logger.info("Password updated successfully for email: {}", email);
    }

}