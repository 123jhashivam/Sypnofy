package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.ArrivalResponse;
import com.sypnofy.signup.dto.CreateBookingRequest;
import com.sypnofy.signup.dto.DepartureResponse;
import com.sypnofy.signup.entity.Booking;
import com.sypnofy.signup.entity.BookingStatus;
import com.sypnofy.signup.entity.Hotel;
import com.sypnofy.signup.entity.User;
import com.sypnofy.signup.exception.BookingNotFoundException;
import com.sypnofy.signup.exception.InvalidCredentialsException;
import com.sypnofy.signup.exception.InvalidStepException;
import com.sypnofy.signup.repository.BookingRepository;
import com.sypnofy.signup.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class CheckInService {

    private static final DateTimeFormatter TIME_FORMAT =
            DateTimeFormatter.ofPattern("h:mm a").withZone(ZoneId.of("Asia/Kolkata"));

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public CheckInService(BookingRepository bookingRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    // --- Reads ---

    public List<ArrivalResponse> getArrivals(String email) {
        Hotel hotel = currentHotel(email);
        return bookingRepository.findByHotelIdAndStatusOrderByEtaAtAsc(hotel.getId(), BookingStatus.UPCOMING)
                .stream()
                .map(this::toArrival)
                .toList();
    }

    public List<DepartureResponse> getDepartures(String email) {
        Hotel hotel = currentHotel(email);
        return bookingRepository.findByHotelIdAndStatusOrderByCheckoutDueAtAsc(hotel.getId(), BookingStatus.CHECKED_IN)
                .stream()
                .map(this::toDeparture)
                .toList();
    }

    // --- Writes ---

    @Transactional
    public Long createBooking(String email, CreateBookingRequest request) {
        Hotel hotel = currentHotel(email);

        Booking booking = new Booking();
        booking.setHotel(hotel);
        booking.setBookingReference(generateReference());
        booking.setGuestName(request.getGuestName().trim());
        booking.setRoomNumber(request.getRoomNumber().trim());
        booking.setForeignGuest(request.isForeignGuest());
        booking.setEtaAt(Instant.parse(request.getEtaAt()));
        booking.setCheckoutDueAt(Instant.parse(request.getCheckoutDueAt()));
        booking.setStatus(BookingStatus.UPCOMING);

        return bookingRepository.save(booking).getId();
    }

    @Transactional
    public void updateArrivalStep(Long bookingId, String step, boolean done) {
        Booking booking = findBooking(bookingId);
        switch (step) {
            case "preCheckin" -> booking.setPreCheckinDone(done);
            case "consent" -> booking.setConsentDone(done);
            case "kyc" -> booking.setKycDone(done);
            case "roomAssigned" -> booking.setRoomAssignedDone(done);
            default -> throw new InvalidStepException("Unknown check-in step: " + step);
        }
        bookingRepository.save(booking);
    }

    @Transactional
    public void updateDepartureStep(Long bookingId, String step, boolean done) {
        Booking booking = findBooking(bookingId);
        switch (step) {
            case "checkoutTime" -> booking.setCheckoutTimestampDone(done);
            case "roomStatus" -> booking.setRoomStatusDone(done);
            case "foreignDeparture" -> booking.setForeignDepartureDone(done);
            case "compliance" -> booking.setComplianceDone(done);
            case "receipt" -> booking.setReceiptSentDone(done);
            default -> throw new InvalidStepException("Unknown check-out step: " + step);
        }
        bookingRepository.save(booking);
    }

    @Transactional
    public void completeCheckIn(Long bookingId) {
        Booking booking = findBooking(bookingId);
        if (!booking.allCheckInStepsDone()) {
            throw new InvalidStepException("All check-in steps must be completed first.");
        }
        booking.setStatus(BookingStatus.CHECKED_IN);
        booking.setCheckedInAt(Instant.now());
        bookingRepository.save(booking);
    }

    @Transactional
    public void completeCheckOut(Long bookingId) {
        Booking booking = findBooking(bookingId);
        if (!booking.allCheckOutStepsDone()) {
            throw new InvalidStepException("All check-out steps must be completed first.");
        }
        booking.setStatus(BookingStatus.CHECKED_OUT);
        booking.setCheckedOutAt(Instant.now());
        bookingRepository.save(booking);
    }

    // --- Helpers ---

    private Hotel currentHotel(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);
        if (user.getHotels().isEmpty()) {
            throw new InvalidStepException("No property found for this account yet.");
        }
        return user.getHotels().get(0);
    }

    private Booking findBooking(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException(id));
    }

    private String generateReference() {
        return "BK-" + (10000 + (int) (Math.random() * 89999));
    }

    private ArrivalResponse toArrival(Booking b) {
        return new ArrivalResponse(
                b.getId(),
                b.getBookingReference(),
                b.getGuestName(),
                b.getRoomNumber(),
                b.getEtaAt() != null ? TIME_FORMAT.format(b.getEtaAt()) : "-",
                b.getKycStatus().getLabel(),
                new ArrivalResponse.Steps(
                        b.isPreCheckinDone(), b.isConsentDone(), b.isKycDone(), b.isRoomAssignedDone()
                )
        );
    }

    private DepartureResponse toDeparture(Booking b) {
        return new DepartureResponse(
                b.getId(),
                b.getBookingReference(),
                b.getGuestName(),
                b.getRoomNumber(),
                b.getCheckoutDueAt() != null ? TIME_FORMAT.format(b.getCheckoutDueAt()) : "-",
                b.isForeignGuest(),
                new DepartureResponse.Steps(
                        b.isCheckoutTimestampDone(), b.isRoomStatusDone(),
                        b.isForeignDepartureDone(), b.isComplianceDone(), b.isReceiptSentDone()
                )
        );
    }
}
