package com.sypnofy.signup.controller;

import com.sypnofy.signup.dto.StartSelfKycRequest;
import com.sypnofy.signup.dto.VerificationCodeResponse;
import com.sypnofy.signup.service.GuestSelfKycService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/guest/kyc")
@CrossOrigin(origins = "*")
public class GuestSelfKycController {

    private final GuestSelfKycService guestSelfKycService;

    public GuestSelfKycController(GuestSelfKycService guestSelfKycService) {
        this.guestSelfKycService = guestSelfKycService;
    }

    @PostMapping("/start")
    @PreAuthorize("hasRole('GUEST')")
    public ResponseEntity<Map<String, Object>> start(Authentication authentication,
                                                       @Valid @RequestBody StartSelfKycRequest request) {
        return ResponseEntity.ok(guestSelfKycService.start(authentication.getName(), request));
    }

    @PostMapping("/{kycId}/check-status")
    @PreAuthorize("hasRole('GUEST')")
    public ResponseEntity<VerificationCodeResponse> checkStatus(Authentication authentication,
                                                                  @PathVariable Long kycId) {
        return ResponseEntity.ok(guestSelfKycService.checkStatus(authentication.getName(), kycId));
    }
}