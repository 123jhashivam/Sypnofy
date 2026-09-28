package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.*;
import com.sypnofy.signup.entity.GuestAccount;
import com.sypnofy.signup.entity.OtpToken;
import com.sypnofy.signup.exception.EmailAlreadyExistsException;
import com.sypnofy.signup.exception.InvalidCredentialsException;
import com.sypnofy.signup.exception.InvalidOtpException;
import com.sypnofy.signup.exception.InvalidSignupException;
import com.sypnofy.signup.repository.GuestAccountRepository;
import com.sypnofy.signup.repository.OtpTokenRepository;
import com.sypnofy.signup.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class GuestAuthService {

    private static final Logger log = LoggerFactory.getLogger(GuestAuthService.class);
    private static final long OTP_VALIDITY_MINUTES = 5;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final GuestAccountRepository guestAccountRepository;
    private final OtpTokenRepository otpTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public GuestAuthService(GuestAccountRepository guestAccountRepository,
                             OtpTokenRepository otpTokenRepository,
                             PasswordEncoder passwordEncoder,
                             JwtUtil jwtUtil,
                             EmailService emailService) {
        this.guestAccountRepository = guestAccountRepository;
        this.otpTokenRepository = otpTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    @Transactional
    public GuestSignupResponse signup(GuestSignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new InvalidSignupException("Password and confirm password do not match");
        }
        String email = request.getEmail().trim().toLowerCase();
        if (guestAccountRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException(email);
        }

        GuestAccount guest = new GuestAccount();
        guest.setFirstName(request.getFirstName().trim());
        guest.setLastName(request.getLastName().trim());
        guest.setEmail(email);
        guest.setPhone(request.getPhone().trim());
        guest.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        guest = guestAccountRepository.save(guest);

        try {
            emailService.sendSignupConfirmationEmail(guest.getEmail(), guest.getFirstName(), "your Sypnofy guest account");
        } catch (Exception e) {
            log.warn("Guest signup confirmation email failed for {}: {}", guest.getEmail(), e.getMessage());
        }

        return new GuestSignupResponse(guest.getId(), guest.getEmail(), "Account created successfully.");
    }

    @Transactional
    public OtpSentResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        GuestAccount guest = guestAccountRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.getPassword(), guest.getPasswordHash())) {
            throw new InvalidCredentialsException();
        }

        String otpCode = generateOtp();
        OtpToken otpToken = new OtpToken();
        otpToken.setEmail(email);
        otpToken.setOtpCode(otpCode);
        otpToken.setExpiresAt(Instant.now().plus(OTP_VALIDITY_MINUTES, ChronoUnit.MINUTES));
        otpTokenRepository.save(otpToken);

        emailService.sendOtpEmail(email, otpCode);

        return new OtpSentResponse(email, "We've emailed you a 6-digit code. It expires in 5 minutes.");
    }

    @Transactional
    public LoginResponse verifyOtp(VerifyOtpRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        OtpToken otpToken = otpTokenRepository
                .findFirstByEmailAndUsedFalseOrderByCreatedAtDesc(email)
                .orElseThrow(() -> new InvalidOtpException("No active code for this email. Please request a new one."));

        if (otpToken.isExpired()) {
            throw new InvalidOtpException("This code has expired. Please request a new one.");
        }
        if (!otpToken.getOtpCode().equals(request.getOtp())) {
            throw new InvalidOtpException("Incorrect code. Please try again.");
        }
        otpToken.setUsed(true);
        otpTokenRepository.save(otpToken);

        GuestAccount guest = guestAccountRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        String token = jwtUtil.generateToken(guest.getId(), guest.getEmail(), "GUEST");
        return new LoginResponse(token, guest.getId(), guest.getEmail(), "GUEST");
    }

    private String generateOtp() {
        int code = RANDOM.nextInt(1_000_000);
        return String.format("%06d", code);
    }
}