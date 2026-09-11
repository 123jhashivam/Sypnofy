package com.sypnofy.signup.controller;

import com.sypnofy.signup.entity.BookingStatus;
import com.sypnofy.signup.repository.BookingRepository;
import com.sypnofy.signup.repository.GuestRepository;
import com.sypnofy.signup.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;
    private final GuestRepository guestRepository;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {

        Map<String, Object> summary = new HashMap<>();

        summary.put("totalProperties", propertyRepository.count());
        summary.put("totalBookings", bookingRepository.count());

        summary.put(
                "upcomingBookings",
                bookingRepository.findByStatus(BookingStatus.UPCOMING).size()
        );

        summary.put(
                "checkedInBookings",
                bookingRepository.findByStatus(BookingStatus.CHECKED_IN).size()
        );

        summary.put(
                "checkedOutBookings",
                bookingRepository.findByStatus(BookingStatus.CHECKED_OUT).size()
        );

        summary.put("totalGuests", guestRepository.count());

        summary.put(
                "verifiedGuests",
                guestRepository.findByVerificationStatus("Verified").size()
        );

        summary.put(
                "pendingGuests",
                guestRepository.findByVerificationStatus("Pending").size()
        );

        summary.put(
                "foreignGuests",
                guestRepository.findByIsForeignTrue().size()
        );

        return ResponseEntity.ok(summary);
    }
}