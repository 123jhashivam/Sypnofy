package com.sypnofy.signup.dto;

import com.sypnofy.signup.entity.BookingStatus;
import com.sypnofy.signup.entity.KycStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;

@Data
public class BookingRequest {

    @NotNull(message = "Hotel ID is required")
    private Long hotelId;

    @NotBlank(message = "Booking reference is required")
    private String bookingReference;

    @NotBlank(message = "Guest name is required")
    private String guestName;

    @NotBlank(message = "Room number is required")
    private String roomNumber;

    private boolean foreignGuest = false;

    private KycStatus kycStatus = KycStatus.PENDING;

    private BookingStatus status = BookingStatus.UPCOMING;

    private Instant etaAt;

    private Instant checkoutDueAt;
}