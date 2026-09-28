package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.GuestAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuestAccountRepository extends JpaRepository<GuestAccount, Long> {
    boolean existsByEmail(String email);
    Optional<GuestAccount> findByEmail(String email);
}