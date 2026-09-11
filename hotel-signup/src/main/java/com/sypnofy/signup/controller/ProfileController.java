package com.sypnofy.signup.controller;

import com.sypnofy.signup.dto.MeResponse;
import com.sypnofy.signup.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// Tighten this to your actual frontend origin before going to production
@CrossOrigin(origins = "*")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // Requires a valid JWT (enforced by JwtAuthFilter + SecurityConfig's
    // default "anyRequest().authenticated()" rule — this path isn't in
    // the /api/auth/** permitAll list).
    @GetMapping("/api/me")
    public ResponseEntity<MeResponse> me(Authentication authentication) {
        String email = authentication.getName(); // set from the JWT's subject in JwtAuthFilter
        return ResponseEntity.ok(profileService.getCurrentUserProfile(email));
    }
}
