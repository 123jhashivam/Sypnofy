package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.GuestRequest;
import com.sypnofy.signup.entity.Guest;
import java.util.List;

public interface GuestService {
    List<Guest> getAllGuests();
    List<Guest> getForeignGuests();
    Guest getGuestById(Long id);
    Guest createGuest(GuestRequest request);
    Guest updateGuest(Long id, GuestRequest request);
    void deleteGuest(Long id);
}