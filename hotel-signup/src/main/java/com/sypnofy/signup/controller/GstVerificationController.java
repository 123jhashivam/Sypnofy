package com.sypnofy.signup.controller;

import com.sypnofy.signup.dto.GstVerificationResponse;
import com.sypnofy.signup.dto.VerifyGstRequest;
import com.sypnofy.signup.service.GstVerificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gst")
// Tighten this to your actual frontend origin before going to production
@CrossOrigin(origins = "*")
public class GstVerificationController {

    private final GstVerificationService gstVerificationService;

    public GstVerificationController(GstVerificationService gstVerificationService) {
        this.gstVerificationService = gstVerificationService;
    }

    @GetMapping
    public List<GstVerificationResponse> list(Authentication authentication) {
        return gstVerificationService.listForHotel(authentication.getName());
    }

    @PostMapping("/verify")
    public ResponseEntity<GstVerificationResponse> verify(Authentication authentication,
                                                            @Valid @RequestBody VerifyGstRequest request) {
        return ResponseEntity.ok(gstVerificationService.verify(authentication.getName(), request.getGstin()));
    }
}
