package com.travelplanner.util;

import org.springframework.stereotype.Component;

@Component
public class EmailUtil {
    
    // Additional email processing utilities can go here
    public boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
