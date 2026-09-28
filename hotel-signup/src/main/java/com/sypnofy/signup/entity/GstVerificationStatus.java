package com.sypnofy.signup.entity;

public enum GstVerificationStatus {
    VERIFIED,   // GSTIN found and details returned
    NOT_FOUND,  // GSTIN doesn't exist on the GST portal
    FAILED      // API error (auth, permission, network, etc.)
}
