package com.sypnofy.signup.exception;

public class EmailDeliveryException extends RuntimeException {
    public EmailDeliveryException(String message) {
        super(message);
    }
}
