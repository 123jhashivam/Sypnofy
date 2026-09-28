package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "verified_identities")
public class VerifiedIdentity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aadhaar_hash", nullable = false, unique = true, length = 64)
    private String aadhaarHash;

    @Column(name = "verification_code", nullable = false, unique = true, length = 20)
    private String verificationCode;

    @Column(name = "verified_name", length = 150)
    private String verifiedName;

    @Column(name = "masked_id_number", length = 30)
    private String maskedIdNumber;

    @Column(name = "guest_account_id")
    private Long guestAccountId;

    @Column(name = "verified_at", nullable = false)
    private Instant verifiedAt;

    @PrePersist
    void onCreate() {
        this.verifiedAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getAadhaarHash() { return aadhaarHash; }
    public void setAadhaarHash(String aadhaarHash) { this.aadhaarHash = aadhaarHash; }
    public String getVerificationCode() { return verificationCode; }
    public void setVerificationCode(String verificationCode) { this.verificationCode = verificationCode; }
    public String getVerifiedName() { return verifiedName; }
    public void setVerifiedName(String verifiedName) { this.verifiedName = verifiedName; }
    public String getMaskedIdNumber() { return maskedIdNumber; }
    public void setMaskedIdNumber(String maskedIdNumber) { this.maskedIdNumber = maskedIdNumber; }
    public Long getGuestAccountId() { return guestAccountId; }
    public void setGuestAccountId(Long guestAccountId) { this.guestAccountId = guestAccountId; }
    public Instant getVerifiedAt() { return verifiedAt; }
}