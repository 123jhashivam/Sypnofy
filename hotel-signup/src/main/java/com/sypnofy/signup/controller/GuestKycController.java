package com.sypnofy.signup.controller;

import com.sypnofy.signup.dto.KycResponse;
import com.sypnofy.signup.dto.StartKycRequest;
import com.sypnofy.signup.service.GuestKycService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kyc")
// Tighten this to your actual frontend origin before going to production
@CrossOrigin(origins = "*")
public class GuestKycController {

    private final GuestKycService guestKycService;

    public GuestKycController(GuestKycService guestKycService) {
        this.guestKycService = guestKycService;
    }

    @GetMapping
    public List<KycResponse> list(Authentication authentication) {
        return guestKycService.listForHotel(authentication.getName());
    }

    // Kicks off a DigiLocker session; response includes authorizationUrl
    // — redirect the guest's browser there to collect consent.
    @PostMapping("/start")
    public ResponseEntity<KycResponse> start(Authentication authentication, @Valid @RequestBody StartKycRequest request) {
        return ResponseEntity.ok(guestKycService.start(authentication.getName(), request));
    }

    // Call this after the guest returns from DigiLocker (or poll it every
    // few seconds) to see if verification has completed.
    @PostMapping("/{id}/check-status")
    public ResponseEntity<KycResponse> checkStatus(@PathVariable Long id) {
        return ResponseEntity.ok(guestKycService.checkStatus(id));
    }
}
