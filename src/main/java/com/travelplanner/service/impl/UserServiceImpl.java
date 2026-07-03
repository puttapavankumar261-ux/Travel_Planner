package com.travelplanner.service.impl;

import java.util.List;

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

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepo,
                           RoleRepository roleRepo,
                           UserMapper userMapper) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponseDto registerUser(UserRequestDto request) {

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists.");
        }

        if (userRepo.existsByMobileNumber(request.getMobileNumber())) {
            throw new UserAlreadyExistsException("Mobile Number already exists.");
        }

        Role role = roleRepo.findById(request.getRoleId())
                .orElseThrow(() ->
                        new RoleNotFoundException(
                                "Role not found with ID : " + request.getRoleId()));

        User user = userMapper.mapToUser(request, role);

        User savedUser = userRepo.save(user);

        return userMapper.mapToUserResponse(savedUser);
    }

    @Override
    public UserResponseDto getUserById(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with ID : " + userId));

        return userMapper.mapToUserResponse(user);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {

        return userRepo.findAll()
                .stream()
                .map(userMapper::mapToUserResponse)
                .toList();
    }

    @Override
    public UserResponseDto updateUser(Long userId, UserRequestDto request) {

        User existingUser = userRepo.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with ID : " + userId));

        if (!existingUser.getEmail().equals(request.getEmail())
                && userRepo.existsByEmail(request.getEmail())) {

            throw new UserAlreadyExistsException("Email already exists.");
        }

        if (!existingUser.getMobileNumber().equals(request.getMobileNumber())
                && userRepo.existsByMobileNumber(request.getMobileNumber())) {

            throw new UserAlreadyExistsException("Mobile Number already exists.");
        }

        Role role = roleRepo.findById(request.getRoleId())
                .orElseThrow(() ->
                        new RoleNotFoundException(
                                "Role not found with ID : " + request.getRoleId()));

        existingUser.setFirstName(request.getFirstName());
        existingUser.setLastName(request.getLastName());
        existingUser.setEmail(request.getEmail());
        existingUser.setPassword(request.getPassword());
        existingUser.setMobileNumber(request.getMobileNumber());
        existingUser.setDateOfBirth(request.getDateOfBirth());
        existingUser.setGender(request.getGender());
        existingUser.setCountry(request.getCountry());
        existingUser.setPreferredLanguage(request.getPreferredLanguage());
        existingUser.setPreferredCurrency(request.getPreferredCurrency());
        existingUser.setRole(role);

        User updatedUser = userRepo.save(existingUser);

        return userMapper.mapToUserResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with ID : " + userId));

        userRepo.delete(user);
    }

}