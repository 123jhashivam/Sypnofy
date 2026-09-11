package com.sypnofy.signup.controller;

import com.sypnofy.signup.dto.ArrivalResponse;
import com.sypnofy.signup.dto.CreateBookingRequest;
import com.sypnofy.signup.dto.DepartureResponse;
import com.sypnofy.signup.dto.StepUpdateRequest;
import com.sypnofy.signup.service.CheckInService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/checkin")
// Tighten this to your actual frontend origin before going to production
@CrossOrigin(origins = "*")
public class CheckInController {

    private final CheckInService checkInService;

    public CheckInController(CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    @GetMapping("/arrivals")
    public List<ArrivalResponse> arrivals(Authentication authentication) {
        return checkInService.getArrivals(authentication.getName());
    }

    @GetMapping("/departures")
    public List<DepartureResponse> departures(Authentication authentication) {
        return checkInService.getDepartures(authentication.getName());
    }

    // Temporary helper until a full Bookings module exists — lets you
    // seed a booking to test the arrivals/departures screens.
    @PostMapping("/bookings")
    public ResponseEntity<Map<String, Long>> createBooking(Authentication authentication,
                                                             @Valid @RequestBody CreateBookingRequest request) {
        Long id = checkInService.createBooking(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", id));
    }

    @PatchMapping("/arrivals/{id}/steps")
    public ResponseEntity<Void> updateArrivalStep(@PathVariable Long id, @Valid @RequestBody StepUpdateRequest request) {
        checkInService.updateArrivalStep(id, request.getStep(), request.getDone());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/departures/{id}/steps")
    public ResponseEntity<Void> updateDepartureStep(@PathVariable Long id, @Valid @RequestBody StepUpdateRequest request) {
        checkInService.updateDepartureStep(id, request.getStep(), request.getDone());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/arrivals/{id}/complete")
    public ResponseEntity<Void> completeCheckIn(@PathVariable Long id) {
        checkInService.completeCheckIn(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/departures/{id}/complete")
    public ResponseEntity<Void> completeCheckOut(@PathVariable Long id) {
        checkInService.completeCheckOut(id);
        return ResponseEntity.noContent().build();
    }
}
