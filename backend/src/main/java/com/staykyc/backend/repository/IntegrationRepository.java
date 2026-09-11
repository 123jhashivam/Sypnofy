package com.staykyc.backend.repository;

import com.staykyc.backend.model.Integration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IntegrationRepository extends JpaRepository<Integration, Long> {
    List<Integration> findByCategory(String category);
}