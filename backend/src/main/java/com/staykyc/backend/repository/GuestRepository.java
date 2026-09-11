package com.staykyc.backend.repository;

import com.staykyc.backend.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    List<Guest> findByIsForeignTrue();
    List<Guest> findByVerificationStatus(String status);
}