package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.IntegrationRequest;
import com.sypnofy.signup.entity.Integration;
import com.sypnofy.signup.repository.IntegrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IntegrationServiceImpl implements IntegrationService {

    private final IntegrationRepository integrationRepository;

    @Override
    public List<Integration> getAllIntegrations() {
        return integrationRepository.findAll();
    }

    @Override
    public Integration getIntegrationById(Long id) {
        return integrationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Integration not found with id: " + id));
    }

    @Override
    public Integration createIntegration(IntegrationRequest request) {
        Integration integration = new Integration();
        mapRequestToEntity(request, integration);
        return integrationRepository.save(integration);
    }

    @Override
    public Integration updateIntegration(Long id, IntegrationRequest request) {
        Integration integration = getIntegrationById(id);
        mapRequestToEntity(request, integration);
        return integrationRepository.save(integration);
    }

    @Override
    public Integration toggleStatus(Long id) {
        Integration integration = getIntegrationById(id);
        integration.setStatus("Active".equals(integration.getStatus()) ? "Inactive" : "Active");
        return integrationRepository.save(integration);
    }

    @Override
    public void deleteIntegration(Long id) {
        integrationRepository.delete(getIntegrationById(id));
    }

    private void mapRequestToEntity(IntegrationRequest request, Integration integration) {
        integration.setCategory(request.getCategory());
        integration.setName(request.getName());
        integration.setDescription(request.getDescription());
        if (request.getStatus() != null) integration.setStatus(request.getStatus());
    }
}