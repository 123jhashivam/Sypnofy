package com.sypnofy.signup.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Bean validation failures (@NotBlank, @Email, @Pattern, @AssertTrue...)
    // Returns one message per field so the frontend can show it under the
    // right input, mirroring the inline error style already in the form.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new LinkedHashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fe.getField(), fe.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body(
                HttpStatus.BAD_REQUEST, "Validation failed", fieldErrors));
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleEmailExists(EmailAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body(
                HttpStatus.CONFLICT, ex.getMessage(), null));
    }

    @ExceptionHandler(InvalidSignupException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidSignup(InvalidSignupException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body(
                HttpStatus.BAD_REQUEST, ex.getMessage(), null));
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidCredentials(InvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body(
                HttpStatus.UNAUTHORIZED, ex.getMessage(), null));
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidOtp(InvalidOtpException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body(
                HttpStatus.UNAUTHORIZED, ex.getMessage(), null));
    }

    @ExceptionHandler(EmailDeliveryException.class)
    public ResponseEntity<Map<String, Object>> handleEmailDelivery(EmailDeliveryException ex) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(body(
                HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage(), null));
    }

    private Map<String, Object> body(HttpStatus status, String message, Map<String, String> fieldErrors) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("timestamp", Instant.now().toString());
        map.put("status", status.value());
        map.put("error", message);
        if (fieldErrors != null && !fieldErrors.isEmpty()) {
            map.put("fieldErrors", fieldErrors);
        }
        return map;
    }
}
