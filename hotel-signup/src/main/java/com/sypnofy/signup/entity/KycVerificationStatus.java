package com.sypnofy.signup.entity;

public enum KycVerificationStatus {
    PENDING,   // session created, waiting for guest to complete DigiLocker consent
    VERIFIED,  // document successfully fetched
    FAILED     // consent denied, session expired, or an API error occurred
}
