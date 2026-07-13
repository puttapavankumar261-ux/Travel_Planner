package com.travelplanner.exception;

public class ItineraryNotFoundException extends RuntimeException {

    public ItineraryNotFoundException(String message) {
        super(message);
    }

}