package com.staykyc.backend.controller;

import com.staykyc.backend.repository.BookingRepository;
import com.staykyc.backend.repository.GuestRepository;
import com.staykyc.backend.repository.PropertyRepository;
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
        summary.put("confirmedBookings", bookingRepository.findByBookingStatus("Confirmed").size());
        summary.put("checkedInBookings", bookingRepository.findByBookingStatus("Checked-in").size());

        summary.put("totalGuests", guestRepository.count());
        summary.put("verifiedGuests", guestRepository.findByVerificationStatus("Verified").size());
        summary.put("pendingGuests", guestRepository.findByVerificationStatus("Pending").size());

        summary.put("foreignGuests", guestRepository.findByIsForeignTrue().size());

        return ResponseEntity.ok(summary);
    }
}