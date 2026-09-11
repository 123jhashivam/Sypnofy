package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    List<Guest> findByIsForeignTrue();
    List<Guest> findByVerificationStatus(String status);
}