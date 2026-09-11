package com.sypnofy.signup.controller;

import com.sypnofy.signup.dto.LoginRequest;
import com.sypnofy.signup.dto.LoginResponse;
import com.sypnofy.signup.dto.OtpSentResponse;
import com.sypnofy.signup.dto.SignupRequest;
import com.sypnofy.signup.dto.SignupResponse;
import com.sypnofy.signup.dto.VerifyOtpRequest;
import com.sypnofy.signup.service.AuthService;
import com.sypnofy.signup.service.SignupService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
// Tighten this to your actual frontend origin before going to production
@CrossOrigin(origins = "*")
public class AuthController {

    private final SignupService signupService;
    private final AuthService authService;

    public AuthController(SignupService signupService, AuthService authService) {
        this.signupService = signupService;
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        SignupResponse response = signupService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Step 1 of login — checks email + password, emails a one-time code.
    // No JWT here yet.
    @PostMapping("/login")
    public ResponseEntity<OtpSentResponse> login(@Valid @RequestBody LoginRequest request) {
        OtpSentResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // Step 2 of login — checks the OTP, issues the JWT. This is the call
    // that actually logs the user in.
    @PostMapping("/verify-otp")
    public ResponseEntity<LoginResponse> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        LoginResponse response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }

    // Re-sends a fresh OTP using the same step-1 flow (email + password
    // still required, so this can't be used to spam an arbitrary inbox).
    @PostMapping("/resend-otp")
    public ResponseEntity<OtpSentResponse> resendOtp(@Valid @RequestBody LoginRequest request) {
        OtpSentResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
