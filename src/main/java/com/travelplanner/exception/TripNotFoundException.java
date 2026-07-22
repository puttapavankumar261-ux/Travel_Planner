package com.travelplanner.exception;

import java.util.List;


public class TripNotFoundException extends RuntimeException {

    public TripNotFoundException(String message) {
        super(message);
    }

}