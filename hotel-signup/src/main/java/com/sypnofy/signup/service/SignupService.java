package com.sypnofy.signup.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.sypnofy.signup.dto.SignupRequest;
import com.sypnofy.signup.dto.SignupResponse;
import com.sypnofy.signup.entity.*;
import com.sypnofy.signup.exception.EmailAlreadyExistsException;
import com.sypnofy.signup.exception.InvalidSignupException;
import com.sypnofy.signup.repository.GstVerificationRepository;
import com.sypnofy.signup.repository.HotelRepository;
import com.sypnofy.signup.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class SignupService {

    private static final Logger log = LoggerFactory.getLogger(SignupService.class);

    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final GstVerificationClient gstVerificationClient;
    private final GstVerificationRepository gstVerificationRepository;

    public SignupService(UserRepository userRepository,
                          HotelRepository hotelRepository,
                          PasswordEncoder passwordEncoder,
                          EmailService emailService,
                          GstVerificationClient gstVerificationClient,
                          GstVerificationRepository gstVerificationRepository) {
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.gstVerificationClient = gstVerificationClient;
        this.gstVerificationRepository = gstVerificationRepository;
    }

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new InvalidSignupException("Password and confirm password do not match");
        }

        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new EmailAlreadyExistsException(request.getEmail());
        }

        HotelType hotelType = HotelType.fromLabel(request.getHotelType());
        if (hotelType == null) {
            throw new InvalidSignupException("Unrecognized hotel type: " + request.getHotelType());
        }

        RoomRange roomRange = RoomRange.fromLabel(request.getRoomRange());
        if (roomRange == null) {
            throw new InvalidSignupException("Unrecognized room range: " + request.getRoomRange());
        }

        User user = new User();
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPhone(request.getPhone().trim());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);

        Hotel hotel = new Hotel();
        hotel.setOwner(user);
        hotel.setCompanyName(request.getCompanyName().trim());
        hotel.setHotelName(request.getHotelName().trim());
        hotel.setCity(request.getCity().trim());
        hotel.setHotelType(hotelType);
        hotel.setRoomRange(roomRange);

        // GST is optional — if given, verify it now so the property record
        // is complete from day one. A failed/unreachable GST check never
        // blocks signup; gstVerified just stays false and can be retried
        // later from settings.
        if (request.getGstin() != null && !request.getGstin().isBlank()) {
            applyGstVerification(hotel, request.getGstin().trim().toUpperCase());
        }

        hotel = hotelRepository.save(hotel);

        try {
            emailService.sendSignupConfirmationEmail(
                    user.getEmail(),
                    user.getFirstName(),
                    hotel.getHotelName()
            );
        } catch (Exception e) {
            log.warn("Signup confirmation email failed to send to {}: {}", user.getEmail(), e.getMessage());
        }

        return new SignupResponse(
                user.getId(),
                hotel.getId(),
                user.getEmail(),
                "Account created successfully. A confirmation email has been sent to your inbox."
        );
    }

    // Verifies a GSTIN and fills the hotel's GST fields. Checks the shared
    // GstVerification cache first — if this exact GSTIN was already
    // verified before (by this hotel or any other), that cached result is
    // reused and Sandbox.co.in is not called again.
    private void applyGstVerification(Hotel hotel, String gstin) {
        var cached = gstVerificationRepository
                .findFirstByGstinAndStatusOrderByCreatedAtDesc(gstin, GstVerificationStatus.VERIFIED);

        if (cached.isPresent()) {
            GstVerification c = cached.get();
            hotel.setGstin(gstin);
            hotel.setGstVerified(true);
            hotel.setGstLegalName(c.getLegalName());
            hotel.setGstTradeName(c.getTradeName());
            hotel.setGstStatus(c.getGstinStatus());
            hotel.setGstStateJurisdiction(c.getStateJurisdiction());
            hotel.setGstRegistrationDate(c.getRegistrationDate());
            hotel.setGstVerifiedAt(Instant.now());
            log.info("GSTIN {} reused from cache — Sandbox.co.in not called again.", gstin);
            return;
        }

        hotel.setGstin(gstin);

        try {
            JsonNode data = gstVerificationClient.verifyGstin(gstin);
            GstVerification record = new GstVerification();
            record.setGstin(gstin);

            if (data == null) {
                record.setStatus(GstVerificationStatus.NOT_FOUND);
                hotel.setGstVerified(false);
            } else {
                JsonNode inner = data.has("data") ? data.path("data") : data;
                String legalName = firstNonEmpty(inner.path("legal_name_of_business").asText(null), inner.path("lgnm").asText(null));
                String tradeName = firstNonEmpty(inner.path("trade_name_of_business").asText(null), inner.path("tradeNam").asText(null));
                String gstinStatus = firstNonEmpty(inner.path("gst_in_status").asText(null), inner.path("sts").asText(null));
                String stateJurisdiction = firstNonEmpty(inner.path("state_jurisdiction").asText(null), inner.path("stjCd").asText(null));
                String registrationDate = firstNonEmpty(inner.path("date_of_registration").asText(null), inner.path("rgdt").asText(null));

                record.setStatus(GstVerificationStatus.VERIFIED);
                record.setLegalName(legalName);
                record.setTradeName(tradeName);
                record.setGstinStatus(gstinStatus);
                record.setStateJurisdiction(stateJurisdiction);
                record.setRegistrationDate(registrationDate);

                hotel.setGstVerified(true);
                hotel.setGstLegalName(legalName);
                hotel.setGstTradeName(tradeName);
                hotel.setGstStatus(gstinStatus);
                hotel.setGstStateJurisdiction(stateJurisdiction);
                hotel.setGstRegistrationDate(registrationDate);
                hotel.setGstVerifiedAt(Instant.now());
            }

            gstVerificationRepository.save(record);

        } catch (Exception e) {
            // Sandbox unreachable/unauthorized/etc — don't fail signup over it
            log.warn("GST verification failed for {} during signup: {}", gstin, e.getMessage());
            hotel.setGstVerified(false);
        }
    }

    private String firstNonEmpty(String... values) {
        for (String v : values) {
            if (v != null && !v.isBlank()) return v;
        }
        return null;
    }
}
