package com.sypnofy.signup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateBookingRequest {

    @NotBlank
    private String guestName;

    @NotBlank
    private String roomNumber;

    private boolean foreignGuest = false;

    // ISO-8601 instant, e.g. "2026-08-12T12:00:00Z" — when the guest is expected to arrive
    @NotNull
    private String etaAt;

    // ISO-8601 instant — when the guest is expected to check out
    @NotNull
    private String checkoutDueAt;

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public boolean isForeignGuest() { return foreignGuest; }
    public void setForeignGuest(boolean foreignGuest) { this.foreignGuest = foreignGuest; }

    public String getEtaAt() { return etaAt; }
    public void setEtaAt(String etaAt) { this.etaAt = etaAt; }

    public String getCheckoutDueAt() { return checkoutDueAt; }
    public void setCheckoutDueAt(String checkoutDueAt) { this.checkoutDueAt = checkoutDueAt; }
}
