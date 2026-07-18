package com.travelplanner.exception;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // =====================================================
    // Common Builder
    // =====================================================

    private ResponseEntity<ApiResponse<Object>> buildErrorResponse(
            String message,
            HttpStatus status) {

        return ResponseEntity
                .status(status)
                .body(ApiResponseUtil.error(message));
    }

    private ResponseEntity<ApiResponse<Object>> buildErrorResponse(
            String message,
            Object data,
            HttpStatus status) {

        return ResponseEntity
                .status(status)
                .body(ApiResponseUtil.error(message, data));
    }

    // =====================================================
    // Custom Exceptions
    // =====================================================

    @ExceptionHandler(RoleAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Object>> handleRoleAlreadyExistsException(
            RoleAlreadyExistsException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleRoleNotFoundException(
            RoleNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Object>> handleUserAlreadyExistsException(
            UserAlreadyExistsException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleUserNotFoundException(
            UserNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidCredentialsException(
            InvalidCredentialsException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccountDisabledException.class)
    public ResponseEntity<ApiResponse<Object>> handleAccountDisabledException(
            AccountDisabledException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AccountLockedException.class)
    public ResponseEntity<ApiResponse<Object>> handleAccountLockedException(
            AccountLockedException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(TripNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleTripNotFoundException(
            TripNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ItineraryNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleItineraryNotFoundException(
            ItineraryNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ExpenseNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleExpenseNotFoundException(
            ExpenseNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccommodationNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleAccommodationNotFoundException(
            AccommodationNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TransportNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleTransportNotFoundException(
            TransportNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ActivityNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleActivityNotFoundException(
            ActivityNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // =====================================================
    // Validation Errors
    // =====================================================

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new LinkedHashMap<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        return buildErrorResponse(
        		ApiMessages.VALIDATION_FAILED,
                errors,
                HttpStatus.BAD_REQUEST);
    }

    // =====================================================
    // Invalid Enum / Invalid JSON
    // =====================================================

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidJson(
            HttpMessageNotReadableException ex) {

        if (ex.getCause() instanceof InvalidFormatException formatException) {

            String field = formatException.getPath().get(0).getFieldName();

            String value = String.valueOf(formatException.getValue());

            return buildErrorResponse(
                    "Invalid value '" + value + "' for field '" + field + "'",
                    HttpStatus.BAD_REQUEST);
        }

        return buildErrorResponse(
        		ApiMessages.INVALID_JSON,
                HttpStatus.BAD_REQUEST);
    }

    // =====================================================
    // Path Variable Type Mismatch
    // =====================================================

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Object>> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex) {

        return buildErrorResponse(
                "Invalid value for parameter '" + ex.getName() + "'",
                HttpStatus.BAD_REQUEST);
    }

    // =====================================================
    // Constraint Validation
    // =====================================================

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleConstraintViolation(
            ConstraintViolationException ex) {

        Map<String, String> errors = new LinkedHashMap<>();

        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {

            errors.put(
                    violation.getPropertyPath().toString(),
                    violation.getMessage());
        }

        return buildErrorResponse(
                "Constraint Validation Failed",
                errors,
                HttpStatus.BAD_REQUEST);
    }

    // =====================================================
    // Database Exceptions
    // =====================================================

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleDatabaseException(
            DataIntegrityViolationException ex) {

        return buildErrorResponse(
        		ApiMessages.DATABASE_ERROR,
                HttpStatus.CONFLICT);
    }

    // =====================================================
    // Generic Exception
    // =====================================================

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(
            Exception ex) {

        ex.printStackTrace();

        return buildErrorResponse(
        		ApiMessages.INTERNAL_SERVER_ERROR,
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}