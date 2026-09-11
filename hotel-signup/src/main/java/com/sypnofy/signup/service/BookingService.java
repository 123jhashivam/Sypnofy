package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.BookingRequest;
import com.sypnofy.signup.entity.Booking;
import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings();
    Booking getBookingById(Long id);
    Booking createBooking(BookingRequest request);
    Booking updateBooking(Long id, BookingRequest request);
    void deleteBooking(Long id);
}