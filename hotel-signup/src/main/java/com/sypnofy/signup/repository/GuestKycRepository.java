package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.GuestKyc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestKycRepository extends JpaRepository<GuestKyc, Long> {
    List<GuestKyc> findByHotelIdOrderByCreatedAtDesc(Long hotelId);
}
