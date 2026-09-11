package com.staykyc.backend.service;

import com.staykyc.backend.dto.BookingRequest;
import com.staykyc.backend.model.Booking;
import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings();
    Booking getBookingById(Long id);
    Booking createBooking(BookingRequest request);
    Booking updateBooking(Long id, BookingRequest request);
    void deleteBooking(Long id);
}