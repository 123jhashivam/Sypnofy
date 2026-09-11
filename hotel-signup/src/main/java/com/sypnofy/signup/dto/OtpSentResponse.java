package com.sypnofy.signup.dto;

public class OtpSentResponse {
    private String email;
    private String message;

    public OtpSentResponse(String email, String message) {
        this.email = email;
        this.message = message;
    }

    public String getEmail() { return email; }
    public String getMessage() { return message; }
}
