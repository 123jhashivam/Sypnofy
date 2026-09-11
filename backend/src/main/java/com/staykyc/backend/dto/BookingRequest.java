package com.staykyc.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingRequest {

    @NotBlank(message = "Guest name is required")
    private String guestName;

    private String pmsRef;

    @NotBlank(message = "Room is required")
    private String room;

    private Integer guestsCount;

    @NotNull(message = "Check-in date is required")
    private LocalDate checkIn;

    @NotNull(message = "Check-out date is required")
    private LocalDate checkOut;

    private String source;
    private String bookingStatus;
    private String kycStatus;
    private String paymentStatus;
    private Long propertyId;
}