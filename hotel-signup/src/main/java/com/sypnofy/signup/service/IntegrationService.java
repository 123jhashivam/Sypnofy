package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.IntegrationRequest;
import com.sypnofy.signup.entity.Integration;
import java.util.List;

public interface IntegrationService {
    List<Integration> getAllIntegrations();
    Integration getIntegrationById(Long id);
    Integration createIntegration(IntegrationRequest request);
    Integration updateIntegration(Long id, IntegrationRequest request);
    Integration toggleStatus(Long id);
    void deleteIntegration(Long id);
}