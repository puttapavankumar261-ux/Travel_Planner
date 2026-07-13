package com.travelplanner.exception;

public class TransportNotFoundException extends RuntimeException {

    public TransportNotFoundException(String message) {
        super(message);
    }

}