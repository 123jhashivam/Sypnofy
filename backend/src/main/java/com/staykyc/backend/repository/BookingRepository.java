package com.staykyc.backend.repository;

import com.staykyc.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByBookingStatus(String status);
    List<Booking> findByPropertyId(Long propertyId);
}