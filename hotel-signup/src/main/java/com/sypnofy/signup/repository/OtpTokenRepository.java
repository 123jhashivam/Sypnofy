package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {

    // Most recent unused OTP for this email — used to verify against
    Optional<OtpToken> findFirstByEmailAndUsedFalseOrderByCreatedAtDesc(String email);
}
