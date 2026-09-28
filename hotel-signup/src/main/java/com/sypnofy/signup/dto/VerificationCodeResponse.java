package com.sypnofy.signup.dto;

public class VerificationCodeResponse {
    private boolean found;
    private String verificationCode;
    private String verifiedName;
    private String maskedIdNumber;
    private String verifiedAt;

    public VerificationCodeResponse(boolean found, String verificationCode, String verifiedName,
                                     String maskedIdNumber, String verifiedAt) {
        this.found = found;
        this.verificationCode = verificationCode;
        this.verifiedName = verifiedName;
        this.maskedIdNumber = maskedIdNumber;
        this.verifiedAt = verifiedAt;
    }

    public boolean isFound() { return found; }
    public String getVerificationCode() { return verificationCode; }
    public String getVerifiedName() { return verifiedName; }
    public String getMaskedIdNumber() { return maskedIdNumber; }
    public String getVerifiedAt() { return verifiedAt; }
}