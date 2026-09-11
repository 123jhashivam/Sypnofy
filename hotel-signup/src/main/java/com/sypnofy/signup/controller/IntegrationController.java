package com.sypnofy.signup.controller;

import com.sypnofy.signup.dto.IntegrationRequest;
import com.sypnofy.signup.entity.Integration;
import com.sypnofy.signup.service.IntegrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/integrations")
@RequiredArgsConstructor
public class IntegrationController {

    private final IntegrationService integrationService;

    @GetMapping
    public ResponseEntity<List<Integration>> getAllIntegrations() {
        return ResponseEntity.ok(integrationService.getAllIntegrations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Integration> getIntegrationById(@PathVariable Long id) {
        return ResponseEntity.ok(integrationService.getIntegrationById(id));
    }

    @PostMapping
    public ResponseEntity<Integration> createIntegration(@Valid @RequestBody IntegrationRequest request) {
        return ResponseEntity.ok(integrationService.createIntegration(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integration> updateIntegration(@PathVariable Long id, @Valid @RequestBody IntegrationRequest request) {
        return ResponseEntity.ok(integrationService.updateIntegration(id, request));
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<Integration> toggleStatus(@PathVariable Long id) {
        return ResponseEntity.ok(integrationService.toggleStatus(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIntegration(@PathVariable Long id) {
        integrationService.deleteIntegration(id);
        return ResponseEntity.noContent().build();
    }
}