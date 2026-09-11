package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.Integration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IntegrationRepository extends JpaRepository<Integration, Long> {
    List<Integration> findByCategory(String category);
}