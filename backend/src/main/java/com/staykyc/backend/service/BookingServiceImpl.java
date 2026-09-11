package com.staykyc.backend.service;

import com.staykyc.backend.dto.BookingRequest;
import com.staykyc.backend.model.Booking;
import com.staykyc.backend.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + id));
    }

    @Override
    public Booking createBooking(BookingRequest request) {
        Booking booking = new Booking();
        mapRequestToEntity(request, booking);
        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(Long id, BookingRequest request) {
        Booking booking = getBookingById(id);
        mapRequestToEntity(request, booking);
        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.delete(getBookingById(id));
    }

    private void mapRequestToEntity(BookingRequest request, Booking booking) {
        booking.setGuestName(request.getGuestName());
        booking.setPmsRef(request.getPmsRef());
        booking.setRoom(request.getRoom());
        if (request.getGuestsCount() != null) booking.setGuestsCount(request.getGuestsCount());
        booking.setCheckIn(request.getCheckIn());
        booking.setCheckOut(request.getCheckOut());
        if (request.getSource() != null) booking.setSource(request.getSource());
        if (request.getBookingStatus() != null) booking.setBookingStatus(request.getBookingStatus());
        if (request.getKycStatus() != null) booking.setKycStatus(request.getKycStatus());
        if (request.getPaymentStatus() != null) booking.setPaymentStatus(request.getPaymentStatus());
    }
}