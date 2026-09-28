package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.GstVerification;
import com.sypnofy.signup.entity.GstVerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GstVerificationRepository extends JpaRepository<GstVerification, Long> {
    List<GstVerification> findByHotelIdOrderByCreatedAtDesc(Long hotelId);

    // Cache lookup — if this GSTIN was already verified before (by anyone),
    // reuse that result instead of calling Sandbox.co.in again.
    Optional<GstVerification> findFirstByGstinAndStatusOrderByCreatedAtDesc(String gstin, GstVerificationStatus status);
}
