package com.sypnofy.signup.dto;

import jakarta.validation.constraints.*;

public class SignupRequest {

    // ---- Personal details ----
    @NotBlank(message = "First name is required")
    @Size(max = 100)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 255)
    private String email;

    // Sent without +91 — the UI locks the prefix to India
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit Indian mobile number")
    private String phone;

    // ---- Business details ----
    @NotBlank(message = "Company name is required")
    @Size(max = 150)
    private String companyName;

    @NotBlank(message = "Hotel name is required")
    @Size(max = 150)
    private String hotelName;

    @NotBlank(message = "City is required")
    @Size(max = 100)
    private String city;

    @NotBlank(message = "Hotel type is required")
    private String hotelType;

    @NotBlank(message = "Number of rooms is required")
    private String roomRange;

    // ---- Security ----
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 72, message = "Password must be at least 8 characters")
    @Pattern(
        regexp = "^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$",
        message = "Password needs at least one number and one symbol"
    )
    private String password;

    @NotBlank(message = "Please confirm your password")
    private String confirmPassword;

    @AssertTrue(message = "You must agree to the Terms and Privacy Policy")
    private boolean agreedToTerms;

    // --- getters and setters ---

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getHotelType() { return hotelType; }
    public void setHotelType(String hotelType) { this.hotelType = hotelType; }

    public String getRoomRange() { return roomRange; }
    public void setRoomRange(String roomRange) { this.roomRange = roomRange; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }

    public boolean isAgreedToTerms() { return agreedToTerms; }
    public void setAgreedToTerms(boolean agreedToTerms) { this.agreedToTerms = agreedToTerms; }
}
