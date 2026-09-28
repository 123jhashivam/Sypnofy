package com.sypnofy.signup.dto;

public class GuestSignupResponse {
    private Long guestId;
    private String email;
    private String message;

    public GuestSignupResponse(Long guestId, String email, String message) {
        this.guestId = guestId;
        this.email = email;
        this.message = message;
    }

    public Long getGuestId() { return guestId; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
}