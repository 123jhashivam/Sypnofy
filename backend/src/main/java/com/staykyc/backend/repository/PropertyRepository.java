package com.staykyc.backend.repository;

import com.staykyc.backend.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}