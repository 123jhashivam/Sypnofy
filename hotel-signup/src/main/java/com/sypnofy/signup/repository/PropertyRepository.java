package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}