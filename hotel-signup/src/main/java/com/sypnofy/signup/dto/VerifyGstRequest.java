package com.sypnofy.signup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class VerifyGstRequest {

    @NotBlank
    @Pattern(regexp = "^[0-9A-Z]{15}$", message = "GSTIN must be 15 characters")
    private String gstin;

    public String getGstin() { return gstin; }
    public void setGstin(String gstin) { this.gstin = gstin; }
}
