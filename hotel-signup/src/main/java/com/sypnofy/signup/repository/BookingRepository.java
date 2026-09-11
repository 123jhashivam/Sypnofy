package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.Booking;
import com.sypnofy.signup.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByHotelIdAndStatusOrderByEtaAtAsc(
            Long hotelId,
            BookingStatus status
    );

    List<Booking> findByHotelIdAndStatusOrderByCheckoutDueAtAsc(
            Long hotelId,
            BookingStatus status
    );

    List<Booking> findByStatus(BookingStatus status);
}