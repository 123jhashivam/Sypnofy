package com.staykyc.backend.controller;

import com.staykyc.backend.dto.GuestRequest;
import com.staykyc.backend.model.Guest;
import com.staykyc.backend.service.GuestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;

    @GetMapping
    public ResponseEntity<List<Guest>> getAllGuests() {
        return ResponseEntity.ok(guestService.getAllGuests());
    }

    // used by the Foreign Guests page
    @GetMapping("/foreign")
    public ResponseEntity<List<Guest>> getForeignGuests() {
        return ResponseEntity.ok(guestService.getForeignGuests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Guest> getGuestById(@PathVariable Long id) {
        return ResponseEntity.ok(guestService.getGuestById(id));
    }

    @PostMapping
    public ResponseEntity<Guest> createGuest(@Valid @RequestBody GuestRequest request) {
        return ResponseEntity.ok(guestService.createGuest(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Guest> updateGuest(@PathVariable Long id, @Valid @RequestBody GuestRequest request) {
        return ResponseEntity.ok(guestService.updateGuest(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        guestService.deleteGuest(id);
        return ResponseEntity.noContent().build();
    }
}