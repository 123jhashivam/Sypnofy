package com.sypnofy.signup.dto;

public class GstVerificationResponse {
    private Long id;
    private String gstin;
    private String status; // "VERIFIED" | "NOT_FOUND" | "FAILED"
    private String legalName;
    private String tradeName;
    private String gstinStatus;
    private String stateJurisdiction;
    private String registrationDate;
    private String failureReason;
    private String createdAt;

    public GstVerificationResponse(Long id, String gstin, String status, String legalName, String tradeName,
                                    String gstinStatus, String stateJurisdiction, String registrationDate,
                                    String failureReason, String createdAt) {
        this.id = id;
        this.gstin = gstin;
        this.status = status;
        this.legalName = legalName;
        this.tradeName = tradeName;
        this.gstinStatus = gstinStatus;
        this.stateJurisdiction = stateJurisdiction;
        this.registrationDate = registrationDate;
        this.failureReason = failureReason;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getGstin() { return gstin; }
    public String getStatus() { return status; }
    public String getLegalName() { return legalName; }
    public String getTradeName() { return tradeName; }
    public String getGstinStatus() { return gstinStatus; }
    public String getStateJurisdiction() { return stateJurisdiction; }
    public String getRegistrationDate() { return registrationDate; }
    public String getFailureReason() { return failureReason; }
    public String getCreatedAt() { return createdAt; }
}
