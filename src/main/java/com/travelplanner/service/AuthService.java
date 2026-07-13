package com.travelplanner.service;

import com.travelplanner.dto.LoginRequestDto;
import com.travelplanner.dto.LoginResponseDto;
import com.travelplanner.dto.LogoutResponseDto;

public interface AuthService {

    LoginResponseDto login(LoginRequestDto request);

    LogoutResponseDto logout();

}