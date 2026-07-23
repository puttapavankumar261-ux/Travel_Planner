package com.travelplanner.exception;

public class TripCompanionNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public TripCompanionNotFoundException(String message) {
        super(message);
    }
}