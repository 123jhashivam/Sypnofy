package com.sypnofy.signup.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PropertyRequest {

    @NotBlank(message = "Property name is required")
    private String name;

    private String legalEntity;
    private String brand;
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    private String state;
    private String pin;
    private String gstin;
    private String pan;
    private String contactNumber;
    private String emergencyContact;
    private String timezone;
    private String checkInTime;
    private String checkOutTime;
    private Integer rooms;
    private String status;
}