package com.travelplanner.exception;

public class NotificationNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public NotificationNotFoundException(String message) {
        super(message);
    }
}