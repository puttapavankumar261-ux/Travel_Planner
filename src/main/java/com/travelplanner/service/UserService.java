package com.travelplanner.service;

import java.util.List;

import com.travelplanner.dto.UserRequestDto;
import com.travelplanner.dto.UserResponseDto;

public interface UserService {

    UserResponseDto registerUser(UserRequestDto request);

    UserResponseDto getUserById(Long userId);

    List<UserResponseDto> getAllUsers();

    UserResponseDto updateUser(Long userId, UserRequestDto request);

    void deleteUser(Long userId);

}