package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.GuestRequest;
import com.sypnofy.signup.entity.Guest;
import com.sypnofy.signup.repository.GuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GuestServiceImpl implements GuestService {

    private final GuestRepository guestRepository;

    @Override
    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }

    @Override
    public List<Guest> getForeignGuests() {
        return guestRepository.findByIsForeignTrue();
    }

    @Override
    public Guest getGuestById(Long id) {
        return guestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Guest not found with id: " + id));
    }

    @Override
    public Guest createGuest(GuestRequest request) {
        Guest guest = new Guest();
        mapRequestToEntity(request, guest);
        return guestRepository.save(guest);
    }

    @Override
    public Guest updateGuest(Long id, GuestRequest request) {
        Guest guest = getGuestById(id);
        mapRequestToEntity(request, guest);
        return guestRepository.save(guest);
    }

    @Override
    public void deleteGuest(Long id) {
        guestRepository.delete(getGuestById(id));
    }

    private void mapRequestToEntity(GuestRequest request, Guest guest) {
        guest.setName(request.getName());
        guest.setBookingRef(request.getBookingRef());
        guest.setIdentityType(request.getIdentityType());
        if (request.getConsentStatus() != null) guest.setConsentStatus(request.getConsentStatus());
        if (request.getVerificationStatus() != null) guest.setVerificationStatus(request.getVerificationStatus());
        if (request.getIsForeign() != null) guest.setIsForeign(request.getIsForeign());
        guest.setNationality(request.getNationality());
        guest.setPassportNumber(request.getPassportNumber());
        guest.setPassportExpiry(request.getPassportExpiry());
        guest.setVisaType(request.getVisaType());
        guest.setVisaNumber(request.getVisaNumber());
        guest.setVisaValidFrom(request.getVisaValidFrom());
        guest.setVisaValidUntil(request.getVisaValidUntil());
        guest.setComplianceReportStatus(request.getComplianceReportStatus());
    }
}