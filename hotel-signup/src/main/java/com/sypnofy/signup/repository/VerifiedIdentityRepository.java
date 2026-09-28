package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.VerifiedIdentity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerifiedIdentityRepository extends JpaRepository<VerifiedIdentity, Long> {
    Optional<VerifiedIdentity> findByAadhaarHash(String aadhaarHash);
    Optional<VerifiedIdentity> findByVerificationCode(String verificationCode);
    boolean existsByVerificationCode(String verificationCode);
}