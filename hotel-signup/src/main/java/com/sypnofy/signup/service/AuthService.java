package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.LoginRequest;
import com.sypnofy.signup.dto.LoginResponse;
import com.sypnofy.signup.dto.OtpSentResponse;
import com.sypnofy.signup.dto.VerifyOtpRequest;
import com.sypnofy.signup.entity.OtpToken;
import com.sypnofy.signup.entity.User;
import com.sypnofy.signup.exception.EmailDeliveryException;
import com.sypnofy.signup.exception.InvalidCredentialsException;
import com.sypnofy.signup.exception.InvalidOtpException;
import com.sypnofy.signup.repository.OtpTokenRepository;
import com.sypnofy.signup.repository.UserRepository;
import com.sypnofy.signup.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class AuthService {

    private static final int OTP_LENGTH = 6;
    private static final long OTP_VALIDITY_MINUTES = 5;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UserRepository userRepository;
    private final OtpTokenRepository otpTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                        OtpTokenRepository otpTokenRepository,
                        PasswordEncoder passwordEncoder,
                        JwtUtil jwtUtil,
                        EmailService emailService) {
        this.userRepository = userRepository;
        this.otpTokenRepository = otpTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    // Step 1 — verify email + password, then email a fresh OTP.
    // Deliberately does NOT return a JWT: the session isn't trusted until
    // the OTP is verified in step 2.
    @Transactional
    public OtpSentResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException();
        }

        String otpCode = generateOtp();

        OtpToken otpToken = new OtpToken();
        otpToken.setEmail(email);
        otpToken.setOtpCode(otpCode);
        otpToken.setExpiresAt(Instant.now().plus(OTP_VALIDITY_MINUTES, ChronoUnit.MINUTES));
        otpTokenRepository.save(otpToken);

        // If the mail server rejects this, the user needs to know clearly
        // ("couldn't send the code") rather than see a raw stack trace —
        // GlobalExceptionHandler turns this into a clean 503 response.
        try {
            emailService.sendOtpEmail(email, otpCode);
        } catch (Exception e) {
            throw new EmailDeliveryException(
                "We couldn't send the login code right now. Please try again in a moment."
            );
        }

        return new OtpSentResponse(email, "We've emailed you a 6-digit code. It expires in 5 minutes.");
    }

    // Step 2 — verify the OTP, then issue the JWT. This is the point at
    // which the user is actually considered logged in.
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

        User user = userRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        return new LoginResponse(token, user.getId(), user.getEmail(), user.getRole().name());
    }

    private String generateOtp() {
        int bound = (int) Math.pow(10, OTP_LENGTH);
        int code = RANDOM.nextInt(bound);
        return String.format("%0" + OTP_LENGTH + "d", code);
    }
}
