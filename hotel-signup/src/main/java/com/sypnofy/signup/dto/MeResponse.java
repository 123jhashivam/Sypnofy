package com.sypnofy.signup.dto;

public class MeResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;

    private Long hotelId;
    private String companyName;
    private String hotelName;
    private String city;
    private String hotelType;
    private String roomRange;

    public MeResponse(Long userId, String firstName, String lastName, String email, String phone, String role,
                       Long hotelId, String companyName, String hotelName, String city, String hotelType, String roomRange) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.hotelId = hotelId;
        this.companyName = companyName;
        this.hotelName = hotelName;
        this.city = city;
        this.hotelType = hotelType;
        this.roomRange = roomRange;
    }

    public Long getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getRole() { return role; }
    public Long getHotelId() { return hotelId; }
    public String getCompanyName() { return companyName; }
    public String getHotelName() { return hotelName; }
    public String getCity() { return city; }
    public String getHotelType() { return hotelType; }
    public String getRoomRange() { return roomRange; }
}
