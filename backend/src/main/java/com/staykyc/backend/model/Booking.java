package com.staykyc.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String guestName;

    private String pmsRef;

    @Column(nullable = false)
    private String room;

    private Integer guestsCount = 1;

    @Column(nullable = false)
    private LocalDate checkIn;

    @Column(nullable = false)
    private LocalDate checkOut;

    private String source = "Direct";   // Direct, Booking.com, Walk-in, etc.

    private String bookingStatus = "Confirmed";   // Confirmed, Checked-in, Checked-out, Cancelled
    private String kycStatus = "Pending";          // Pending, Verified, Manual review, Failed
    private String paymentStatus = "Unpaid";       // Paid, Unpaid, Partial

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
}