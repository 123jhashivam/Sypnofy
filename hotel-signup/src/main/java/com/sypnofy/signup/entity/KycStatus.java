package com.sypnofy.signup.entity;

public enum KycStatus {
    VERIFIED("Verified"),
    PENDING("Pending"),
    MANUAL_REVIEW("Manual review");

    private final String label;

    KycStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
