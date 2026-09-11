package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String legalEntity;
    private String brand;

    private String address;

    @Column(nullable = false)
    private String city;

    private String state;
    private String pin;

    private String gstin;
    private String pan;

    private String contactNumber;
    private String emergencyContact;

    private String timezone = "Asia/Kolkata";
    private String checkInTime = "12:00";
    private String checkOutTime = "11:00";

    private Integer rooms = 0;

    @Column(nullable = false)
    private String status = "Active";
}