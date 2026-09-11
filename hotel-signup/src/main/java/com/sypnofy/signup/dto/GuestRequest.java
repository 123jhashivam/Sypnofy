package com.sypnofy.signup.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class GuestRequest {

    @NotBlank(message = "Guest name is required")
    private String name;

    private String bookingRef;
    private String identityType;
    private String consentStatus;
    private String verificationStatus;
    private Boolean isForeign;
    private String nationality;
    private String passportNumber;
    private LocalDate passportExpiry;
    private String visaType;
    private String visaNumber;
    private LocalDate visaValidFrom;
    private LocalDate visaValidUntil;
    private String complianceReportStatus;
}