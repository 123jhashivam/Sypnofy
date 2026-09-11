package com.sypnofy.signup.dto;

import jakarta.validation.constraints.NotBlank;

public class StartKycRequest {

    @NotBlank
    private String guestName;

    private Long bookingId; // optional — link to a check-in booking

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
}
