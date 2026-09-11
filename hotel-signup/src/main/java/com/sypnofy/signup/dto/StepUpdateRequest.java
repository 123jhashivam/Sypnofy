package com.sypnofy.signup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class StepUpdateRequest {

    // Arrival: "preCheckin" | "consent" | "kyc" | "roomAssigned"
    // Departure: "checkoutTime" | "roomStatus" | "foreignDeparture" | "compliance" | "receipt"
    @NotBlank
    private String step;

    @NotNull
    private Boolean done;

    public String getStep() { return step; }
    public void setStep(String step) { this.step = step; }

    public Boolean getDone() { return done; }
    public void setDone(Boolean done) { this.done = done; }
}
