package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.BookingRequest;
import com.sypnofy.signup.entity.Booking;
import com.sypnofy.signup.entity.Hotel;
import com.sypnofy.signup.repository.BookingRepository;
import com.sypnofy.signup.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Booking not found with id: " + id));
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

    private void mapRequestToEntity(
            BookingRequest request,
            Booking booking) {

        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Hotel not found with id: " + request.getHotelId()
                        ));

        booking.setHotel(hotel);

        booking.setBookingReference(request.getBookingReference());

        booking.setGuestName(request.getGuestName());

        booking.setRoomNumber(request.getRoomNumber());

        booking.setForeignGuest(request.isForeignGuest());

        if (request.getKycStatus() != null) {
            booking.setKycStatus(request.getKycStatus());
        }

        if (request.getStatus() != null) {
            booking.setStatus(request.getStatus());
        }

        booking.setEtaAt(request.getEtaAt());

        booking.setCheckoutDueAt(request.getCheckoutDueAt());
    }
}