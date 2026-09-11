package com.sypnofy.signup.exception;

public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException(Long id) {
        super("Booking not found: " + id);
    }
}
