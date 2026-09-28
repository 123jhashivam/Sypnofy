package com.sypnofy.signup.controller;

import com.sypnofy.signup.dto.VerificationCodeResponse;
import com.sypnofy.signup.service.IdentityVerificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/verification")
@CrossOrigin(origins = "*")
public class VerificationCodeController {

    private final IdentityVerificationService identityVerificationService;

    public VerificationCodeController(IdentityVerificationService identityVerificationService) {
        this.identityVerificationService = identityVerificationService;
    }

    @GetMapping("/lookup/{code}")
    public ResponseEntity<VerificationCodeResponse> lookup(@PathVariable String code) {
        return identityVerificationService.lookupByCode(code)
                .map(identity -> ResponseEntity.ok(new VerificationCodeResponse(
                        true,
                        identity.getVerificationCode(),
                        identity.getVerifiedName(),
                        identity.getMaskedIdNumber(),
                        identity.getVerifiedAt().toString()
                )))
                .orElseGet(() -> ResponseEntity.ok(
                        new VerificationCodeResponse(false, null, null, null, null)
                ));
    }
}