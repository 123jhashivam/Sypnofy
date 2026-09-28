package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "gst_verifications")
public class GstVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Column(nullable = false, length = 20)
    private String gstin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private GstVerificationStatus status;

    @Column(name = "legal_name", length = 200)
    private String legalName;

    @Column(name = "trade_name", length = 200)
    private String tradeName;

    // "Active" | "Cancelled" | etc. — straight from the GST portal
    @Column(name = "gstin_status", length = 30)
    private String gstinStatus;

    @Column(name = "state_jurisdiction", length = 150)
    private String stateJurisdiction;

    @Column(name = "registration_date", length = 30)
    private String registrationDate;

    @Column(name = "failure_reason", length = 255)
    private String failureReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }

    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }

    public String getGstin() { return gstin; }
    public void setGstin(String gstin) { this.gstin = gstin; }

    public GstVerificationStatus getStatus() { return status; }
    public void setStatus(GstVerificationStatus status) { this.status = status; }

    public String getLegalName() { return legalName; }
    public void setLegalName(String legalName) { this.legalName = legalName; }

    public String getTradeName() { return tradeName; }
    public void setTradeName(String tradeName) { this.tradeName = tradeName; }

    public String getGstinStatus() { return gstinStatus; }
    public void setGstinStatus(String gstinStatus) { this.gstinStatus = gstinStatus; }

    public String getStateJurisdiction() { return stateJurisdiction; }
    public void setStateJurisdiction(String stateJurisdiction) { this.stateJurisdiction = stateJurisdiction; }

    public String getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(String registrationDate) { this.registrationDate = registrationDate; }

    public String getFailureReason() { return failureReason; }
    public void setFailureReason(String failureReason) { this.failureReason = failureReason; }

    public Instant getCreatedAt() { return createdAt; }
}
