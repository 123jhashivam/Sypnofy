package com.sypnofy.signup.dto;

public class DepartureResponse {
    private Long id;
    private String booking;
    private String guest;
    private String room;
    private String time;        // formatted checkout-due time
    private boolean foreign;
    private Steps steps;

    public DepartureResponse(Long id, String booking, String guest, String room, String time, boolean foreign, Steps steps) {
        this.id = id;
        this.booking = booking;
        this.guest = guest;
        this.room = room;
        this.time = time;
        this.foreign = foreign;
        this.steps = steps;
    }

    public static class Steps {
        public boolean checkoutTime;
        public boolean roomStatus;
        public boolean foreignDeparture;
        public boolean compliance;
        public boolean receipt;

        public Steps(boolean checkoutTime, boolean roomStatus, boolean foreignDeparture, boolean compliance, boolean receipt) {
            this.checkoutTime = checkoutTime;
            this.roomStatus = roomStatus;
            this.foreignDeparture = foreignDeparture;
            this.compliance = compliance;
            this.receipt = receipt;
        }
    }

    public Long getId() { return id; }
    public String getBooking() { return booking; }
    public String getGuest() { return guest; }
    public String getRoom() { return room; }
    public String getTime() { return time; }
    public boolean isForeign() { return foreign; }
    public Steps getSteps() { return steps; }
}
