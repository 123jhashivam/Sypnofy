package com.sypnofy.signup.dto;

public class ArrivalResponse {
    private Long id;
    private String booking;      // booking reference, e.g. "BK-10231"
    private String guest;
    private String room;
    private String time;         // formatted ETA, e.g. "12:00 PM"
    private String kyc;          // "Verified" | "Pending" | "Manual review"
    private Steps steps;

    public ArrivalResponse(Long id, String booking, String guest, String room, String time, String kyc, Steps steps) {
        this.id = id;
        this.booking = booking;
        this.guest = guest;
        this.room = room;
        this.time = time;
        this.kyc = kyc;
        this.steps = steps;
    }

    public static class Steps {
        public boolean preCheckin;
        public boolean consent;
        public boolean kyc;
        public boolean roomAssigned;

        public Steps(boolean preCheckin, boolean consent, boolean kyc, boolean roomAssigned) {
            this.preCheckin = preCheckin;
            this.consent = consent;
            this.kyc = kyc;
            this.roomAssigned = roomAssigned;
        }
    }

    public Long getId() { return id; }
    public String getBooking() { return booking; }
    public String getGuest() { return guest; }
    public String getRoom() { return room; }
    public String getTime() { return time; }
    public String getKyc() { return kyc; }
    public Steps getSteps() { return steps; }
}
