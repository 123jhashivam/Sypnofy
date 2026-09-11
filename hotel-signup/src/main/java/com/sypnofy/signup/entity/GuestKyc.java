package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "guest_kyc")
public class GuestKyc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    // Optional link to a booking, if KYC is being done as part of check-in
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "guest_name", nullable = false, length = 150)
    private String guestName;

    @Column(name = "doc_type", nullable = false, length = 20)
    private String docType; // "aadhaar" | "pan" | "driving_license"

    // Sandbox.co.in's DigiLocker session identifier — needed for the
    // Fetch Document call once the guest has completed consent.
    @Column(name = "session_id", nullable = false, length = 100)
    private String sessionId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private KycVerificationStatus status = KycVerificationStatus.PENDING;

    // Populated once verified — only non-sensitive, display-safe fields.
    // Full document payloads (e.g. Aadhaar XML) are never persisted.
    @Column(name = "verified_name", length = 150)
    private String verifiedName;

    @Column(name = "masked_id_number", length = 30)
    private String maskedIdNumber;

    @Column(name = "failure_reason", length = 255)
    private String failureReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "verified_at")
    private Instant verifiedAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }

    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getDocType() { return docType; }
    public void setDocType(String docType) { this.docType = docType; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public KycVerificationStatus getStatus() { return status; }
    public void setStatus(KycVerificationStatus status) { this.status = status; }

    public String getVerifiedName() { return verifiedName; }
    public void setVerifiedName(String verifiedName) { this.verifiedName = verifiedName; }

    public String getMaskedIdNumber() { return maskedIdNumber; }
    public void setMaskedIdNumber(String maskedIdNumber) { this.maskedIdNumber = maskedIdNumber; }

    public String getFailureReason() { return failureReason; }
    public void setFailureReason(String failureReason) { this.failureReason = failureReason; }

    public Instant getCreatedAt() { return createdAt; }

    public Instant getVerifiedAt() { return verifiedAt; }
    public void setVerifiedAt(Instant verifiedAt) { this.verifiedAt = verifiedAt; }
}
