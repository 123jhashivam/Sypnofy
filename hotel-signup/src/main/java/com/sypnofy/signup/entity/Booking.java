package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Column(name = "booking_reference", nullable = false, length = 30)
    private String bookingReference;

    @Column(name = "guest_name", nullable = false, length = 150)
    private String guestName;

    @Column(name = "room_number", nullable = false, length = 20)
    private String roomNumber;

    @Column(name = "foreign_guest", nullable = false)
    private boolean foreignGuest = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "kyc_status", nullable = false, length = 20)
    private KycStatus kycStatus = KycStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BookingStatus status = BookingStatus.UPCOMING;

    // --- Arrival window ---
    @Column(name = "eta_at")
    private Instant etaAt;

    // --- Check-in steps ---
    @Column(name = "pre_checkin_done", nullable = false)
    private boolean preCheckinDone = false;

    @Column(name = "consent_done", nullable = false)
    private boolean consentDone = false;

    @Column(name = "kyc_done", nullable = false)
    private boolean kycDone = false;

    @Column(name = "room_assigned_done", nullable = false)
    private boolean roomAssignedDone = false;

    @Column(name = "checked_in_at")
    private Instant checkedInAt;

    // --- Departure window ---
    @Column(name = "checkout_due_at")
    private Instant checkoutDueAt;

    // --- Check-out steps ---
    @Column(name = "checkout_timestamp_done", nullable = false)
    private boolean checkoutTimestampDone = false;

    @Column(name = "room_status_done", nullable = false)
    private boolean roomStatusDone = false;

    @Column(name = "foreign_departure_done", nullable = false)
    private boolean foreignDepartureDone = false;

    @Column(name = "compliance_done", nullable = false)
    private boolean complianceDone = false;

    @Column(name = "receipt_sent_done", nullable = false)
    private boolean receiptSentDone = false;

    @Column(name = "checked_out_at")
    private Instant checkedOutAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }

    // --- getters and setters ---

    public Long getId() { return id; }

    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }

    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public boolean isForeignGuest() { return foreignGuest; }
    public void setForeignGuest(boolean foreignGuest) { this.foreignGuest = foreignGuest; }

    public KycStatus getKycStatus() { return kycStatus; }
    public void setKycStatus(KycStatus kycStatus) { this.kycStatus = kycStatus; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public Instant getEtaAt() { return etaAt; }
    public void setEtaAt(Instant etaAt) { this.etaAt = etaAt; }

    public boolean isPreCheckinDone() { return preCheckinDone; }
    public void setPreCheckinDone(boolean v) { this.preCheckinDone = v; }

    public boolean isConsentDone() { return consentDone; }
    public void setConsentDone(boolean v) { this.consentDone = v; }

    public boolean isKycDone() { return kycDone; }
    public void setKycDone(boolean v) { this.kycDone = v; }

    public boolean isRoomAssignedDone() { return roomAssignedDone; }
    public void setRoomAssignedDone(boolean v) { this.roomAssignedDone = v; }

    public Instant getCheckedInAt() { return checkedInAt; }
    public void setCheckedInAt(Instant checkedInAt) { this.checkedInAt = checkedInAt; }

    public Instant getCheckoutDueAt() { return checkoutDueAt; }
    public void setCheckoutDueAt(Instant checkoutDueAt) { this.checkoutDueAt = checkoutDueAt; }

    public boolean isCheckoutTimestampDone() { return checkoutTimestampDone; }
    public void setCheckoutTimestampDone(boolean v) { this.checkoutTimestampDone = v; }

    public boolean isRoomStatusDone() { return roomStatusDone; }
    public void setRoomStatusDone(boolean v) { this.roomStatusDone = v; }

    public boolean isForeignDepartureDone() { return foreignDepartureDone; }
    public void setForeignDepartureDone(boolean v) { this.foreignDepartureDone = v; }

    public boolean isComplianceDone() { return complianceDone; }
    public void setComplianceDone(boolean v) { this.complianceDone = v; }

    public boolean isReceiptSentDone() { return receiptSentDone; }
    public void setReceiptSentDone(boolean v) { this.receiptSentDone = v; }

    public Instant getCheckedOutAt() { return checkedOutAt; }
    public void setCheckedOutAt(Instant checkedOutAt) { this.checkedOutAt = checkedOutAt; }

    public Instant getCreatedAt() { return createdAt; }

    public boolean allCheckInStepsDone() {
        return preCheckinDone && consentDone && kycDone && roomAssignedDone;
    }

    public boolean allCheckOutStepsDone() {
        // foreignDepartureDone only matters for foreign guests
        boolean foreignOk = !foreignGuest || foreignDepartureDone;
        return checkoutTimestampDone && roomStatusDone && foreignOk && complianceDone && receiptSentDone;
    }
}
