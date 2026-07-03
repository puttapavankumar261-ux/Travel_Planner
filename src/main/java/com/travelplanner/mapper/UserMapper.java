package com.travelplanner.mapper;

import org.springframework.stereotype.Component;

import com.travelplanner.dto.UserRequestDto;
import com.travelplanner.dto.UserResponseDto;
import com.travelplanner.entity.Role;
import com.travelplanner.entity.User;
import com.travelplanner.enums.LoginProvider;

@Component
public class UserMapper {

	public User mapToUser(UserRequestDto dto, Role role) {

	    User user = new User();

	    user.setFirstName(dto.getFirstName());
	    user.setLastName(dto.getLastName());
	    user.setEmail(dto.getEmail());
	    user.setPassword(dto.getPassword());
	    user.setMobileNumber(dto.getMobileNumber());
	    user.setDateOfBirth(dto.getDateOfBirth());
	    user.setGender(dto.getGender());
	    user.setCountry(dto.getCountry());
	    user.setPreferredLanguage(dto.getPreferredLanguage());
	    user.setPreferredCurrency(dto.getPreferredCurrency());

	    user.setRole(role);

	    user.setLoginProvider(LoginProvider.LOCAL);

	    user.setAccountEnabled(true);
	    user.setAccountVerified(false);
	    user.setAccountLocked(false);

	    return user;
	}

    public UserResponseDto mapToUserResponse(User user) {

        UserResponseDto response = new UserResponseDto();

        response.setUserId(user.getUserId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setMobileNumber(user.getMobileNumber());
        response.setDateOfBirth(user.getDateOfBirth());
        response.setGender(user.getGender());
        response.setCountry(user.getCountry());
        response.setPreferredLanguage(user.getPreferredLanguage());
        response.setPreferredCurrency(user.getPreferredCurrency());
        response.setProfileImage(user.getProfileImage());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setRoleName(user.getRole().getRoleName());

        return response;
    }
    
}