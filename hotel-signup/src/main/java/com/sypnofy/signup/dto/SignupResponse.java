package com.sypnofy.signup.dto;

public class SignupResponse {
    private Long userId;
    private Long hotelId;
    private String email;
    private String message;

    public SignupResponse(Long userId, Long hotelId, String email, String message) {
        this.userId = userId;
        this.hotelId = hotelId;
        this.email = email;
        this.message = message;
    }

    public Long getUserId() { return userId; }
    public Long getHotelId() { return hotelId; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
}
