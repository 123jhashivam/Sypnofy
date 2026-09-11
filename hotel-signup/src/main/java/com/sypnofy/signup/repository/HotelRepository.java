package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
