package com.sypnofy.signup.dto;

public class KycResponse {
    private Long id;
    private String guestName;
    private String docType;
    private String status;
    private String authorizationUrl;
    private String verifiedName;
    private String maskedIdNumber;
    private String failureReason;
    private String createdAt;
    private String verifiedAt;

    public KycResponse(Long id, String guestName, String docType, String status,
                        String authorizationUrl, String verifiedName, String maskedIdNumber,
                        String failureReason, String createdAt, String verifiedAt) {
        this.id = id;
        this.guestName = guestName;
        this.docType = docType;
        this.status = status;
        this.authorizationUrl = authorizationUrl;
        this.verifiedName = verifiedName;
        this.maskedIdNumber = maskedIdNumber;
        this.failureReason = failureReason;
        this.createdAt = createdAt;
        this.verifiedAt = verifiedAt;
    }

    public Long getId() { return id; }
    public String getGuestName() { return guestName; }
    public String getDocType() { return docType; }
    public String getStatus() { return status; }
    public String getAuthorizationUrl() { return authorizationUrl; }
    public String getVerifiedName() { return verifiedName; }
    public String getMaskedIdNumber() { return maskedIdNumber; }
    public String getFailureReason() { return failureReason; }
    public String getCreatedAt() { return createdAt; }
    public String getVerifiedAt() { return verifiedAt; }
}