package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "guests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String bookingRef;
    private String identityType;
    private String consentStatus = "Pending";
    private String verificationStatus = "Pending";
    private String submittedAt;

    private Boolean isForeign = false;
    private String nationality;
    private String passportNumber;
    private LocalDate passportExpiry;
    private String visaType;
    private String visaNumber;
    private LocalDate visaValidFrom;
    private LocalDate visaValidUntil;
    private String complianceReportStatus;
}