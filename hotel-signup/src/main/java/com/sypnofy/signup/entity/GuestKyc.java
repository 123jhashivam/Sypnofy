package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "guest_kyc")
public class GuestKyc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "hotel_id", nullable = true)
    private Hotel hotel;

    // Set instead of hotel when a guest verifies themselves (no hotel involved).
    @Column(name = "guest_account_id")
    private Long guestAccountId;

    // Once verified, points at the shared VerifiedIdentity record that
    // carries the portable verification code.
    @Column(name = "verified_identity_id")
    private Long verifiedIdentityId;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "guest_name", nullable = false, length = 150)
    private String guestName;

    @Column(name = "doc_type", nullable = false, length = 20)
    private String docType;

    // SHA-256 hash of the Aadhaar number the guest typed — never the raw number.
    @Column(name = "aadhaar_hash", length = 64)
    private String aadhaarHash;

    @Column(name = "session_id", nullable = false, length = 100)
    private String sessionId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private KycVerificationStatus status = KycVerificationStatus.PENDING;

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

    public Long getGuestAccountId() { return guestAccountId; }
    public void setGuestAccountId(Long guestAccountId) { this.guestAccountId = guestAccountId; }

    public Long getVerifiedIdentityId() { return verifiedIdentityId; }
    public void setVerifiedIdentityId(Long verifiedIdentityId) { this.verifiedIdentityId = verifiedIdentityId; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getDocType() { return docType; }
    public void setDocType(String docType) { this.docType = docType; }

    public String getAadhaarHash() { return aadhaarHash; }
    public void setAadhaarHash(String aadhaarHash) { this.aadhaarHash = aadhaarHash; }

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