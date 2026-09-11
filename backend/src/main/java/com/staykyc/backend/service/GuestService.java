package com.staykyc.backend.service;

import com.staykyc.backend.dto.GuestRequest;
import com.staykyc.backend.model.Guest;

import java.util.List;

public interface GuestService {
    List<Guest> getAllGuests();
    List<Guest> getForeignGuests();
    Guest getGuestById(Long id);
    Guest createGuest(GuestRequest request);
    Guest updateGuest(Long id, GuestRequest request);
    void deleteGuest(Long id);
}