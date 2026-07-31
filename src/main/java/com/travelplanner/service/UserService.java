package com.travelplanner.service;

import java.util.List;
import com.travelplanner.dto.UpdateProfileRequestDto;
import com.travelplanner.dto.UserRequestDto;
import com.travelplanner.dto.UserResponseDto;
import com.travelplanner.dto.ChangePasswordRequestDto;

public interface UserService {

    UserResponseDto registerUser(UserRequestDto request);

    UserResponseDto getUserById(Long userId);

    List<UserResponseDto> getAllUsers();

    UserResponseDto updateUser(Long userId, UserRequestDto request);
    
    UserResponseDto updateProfile(Long userId, UpdateProfileRequestDto request);


    void deleteUser(Long userId);
    
    void updatePassword(String email, String newPassword);
    
    boolean existsByEmail(String email);
    void changePassword(Long userId,ChangePasswordRequestDto request);
}