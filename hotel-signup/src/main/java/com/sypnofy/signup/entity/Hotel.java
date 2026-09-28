package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "hotels")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(name = "hotel_name", nullable = false, length = 150)
    private String hotelName;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(name = "hotel_type", nullable = false, length = 30)
    private HotelType hotelType;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_range", nullable = false, length = 20)
    private RoomRange roomRange;

    // --- GST (optional at signup, auto-verified against Sandbox.co.in) ---
    @Column(length = 20)
    private String gstin;

    @Column(name = "gst_verified", nullable = false)
    private boolean gstVerified = false;

    @Column(name = "gst_legal_name", length = 200)
    private String gstLegalName;

    @Column(name = "gst_trade_name", length = 200)
    private String gstTradeName;

    @Column(name = "gst_status", length = 30)
    private String gstStatus; // "Active" | "Cancelled" | etc. from the GST portal

    @Column(name = "gst_state_jurisdiction", length = 150)
    private String gstStateJurisdiction;

    @Column(name = "gst_registration_date", length = 30)
    private String gstRegistrationDate;

    @Column(name = "gst_verified_at")
    private Instant gstVerifiedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }

    // --- getters and setters ---

    public Long getId() { return id; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public HotelType getHotelType() { return hotelType; }
    public void setHotelType(HotelType hotelType) { this.hotelType = hotelType; }

    public RoomRange getRoomRange() { return roomRange; }
    public void setRoomRange(RoomRange roomRange) { this.roomRange = roomRange; }

    public String getGstin() { return gstin; }
    public void setGstin(String gstin) { this.gstin = gstin; }

    public boolean isGstVerified() { return gstVerified; }
    public void setGstVerified(boolean gstVerified) { this.gstVerified = gstVerified; }

    public String getGstLegalName() { return gstLegalName; }
    public void setGstLegalName(String gstLegalName) { this.gstLegalName = gstLegalName; }

    public String getGstTradeName() { return gstTradeName; }
    public void setGstTradeName(String gstTradeName) { this.gstTradeName = gstTradeName; }

    public String getGstStatus() { return gstStatus; }
    public void setGstStatus(String gstStatus) { this.gstStatus = gstStatus; }

    public String getGstStateJurisdiction() { return gstStateJurisdiction; }
    public void setGstStateJurisdiction(String gstStateJurisdiction) { this.gstStateJurisdiction = gstStateJurisdiction; }

    public String getGstRegistrationDate() { return gstRegistrationDate; }
    public void setGstRegistrationDate(String gstRegistrationDate) { this.gstRegistrationDate = gstRegistrationDate; }

    public Instant getGstVerifiedAt() { return gstVerifiedAt; }
    public void setGstVerifiedAt(Instant gstVerifiedAt) { this.gstVerifiedAt = gstVerifiedAt; }

    public Instant getCreatedAt() { return createdAt; }
}
