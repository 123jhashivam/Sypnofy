package com.staykyc.backend.service;

import com.staykyc.backend.dto.IntegrationRequest;
import com.staykyc.backend.model.Integration;

import java.util.List;

public interface IntegrationService {
    List<Integration> getAllIntegrations();
    Integration getIntegrationById(Long id);
    Integration createIntegration(IntegrationRequest request);
    Integration updateIntegration(Long id, IntegrationRequest request);
    Integration toggleStatus(Long id);
    void deleteIntegration(Long id);
}