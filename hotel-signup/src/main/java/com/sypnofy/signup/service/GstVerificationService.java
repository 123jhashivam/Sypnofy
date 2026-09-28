package com.sypnofy.signup.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.sypnofy.signup.dto.GstVerificationResponse;
import com.sypnofy.signup.entity.GstVerification;
import com.sypnofy.signup.entity.GstVerificationStatus;
import com.sypnofy.signup.entity.Hotel;
import com.sypnofy.signup.entity.User;
import com.sypnofy.signup.exception.DigiLockerException;
import com.sypnofy.signup.exception.InvalidCredentialsException;
import com.sypnofy.signup.exception.InvalidStepException;
import com.sypnofy.signup.repository.GstVerificationRepository;
import com.sypnofy.signup.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GstVerificationService {

    private final GstVerificationRepository gstVerificationRepository;
    private final UserRepository userRepository;
    private final GstVerificationClient gstVerificationClient;

    public GstVerificationService(GstVerificationRepository gstVerificationRepository,
                                   UserRepository userRepository,
                                   GstVerificationClient gstVerificationClient) {
        this.gstVerificationRepository = gstVerificationRepository;
        this.userRepository = userRepository;
        this.gstVerificationClient = gstVerificationClient;
    }

    public List<GstVerificationResponse> listForHotel(String email) {
        Hotel hotel = currentHotel(email);
        return gstVerificationRepository.findByHotelIdOrderByCreatedAtDesc(hotel.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public GstVerificationResponse verify(String email, String gstin) {
        Hotel hotel = currentHotel(email);

        GstVerification record = new GstVerification();
        record.setHotel(hotel);
        record.setGstin(gstin.toUpperCase());

        try {
            JsonNode data = gstVerificationClient.verifyGstin(gstin.toUpperCase());

            if (data == null) {
                record.setStatus(GstVerificationStatus.NOT_FOUND);
            } else {
                // Field names follow the standard GSTN payload naming —
                // confirm against a real 200 response once your Sandbox
                // account has GST product access; adjust paths if needed.
                // See https://developer.sandbox.co.in/reference/search-gstin-api
                JsonNode inner = data.has("data") ? data.path("data") : data;

                String legalName = firstNonEmpty(
                        inner.path("legal_name_of_business").asText(null),
                        inner.path("lgnm").asText(null)
                );
                String tradeName = firstNonEmpty(
                        inner.path("trade_name_of_business").asText(null),
                        inner.path("tradeNam").asText(null)
                );
                String gstinStatus = firstNonEmpty(
                        inner.path("gst_in_status").asText(null),
                        inner.path("sts").asText(null)
                );
                String stateJurisdiction = firstNonEmpty(
                        inner.path("state_jurisdiction").asText(null),
                        inner.path("stjCd").asText(null)
                );
                String registrationDate = firstNonEmpty(
                        inner.path("date_of_registration").asText(null),
                        inner.path("rgdt").asText(null)
                );

                record.setStatus(GstVerificationStatus.VERIFIED);
                record.setLegalName(legalName);
                record.setTradeName(tradeName);
                record.setGstinStatus(gstinStatus);
                record.setStateJurisdiction(stateJurisdiction);
                record.setRegistrationDate(registrationDate);
            }
        } catch (DigiLockerException e) {
            record.setStatus(GstVerificationStatus.FAILED);
            record.setFailureReason(e.getMessage());
        }

        record = gstVerificationRepository.save(record);
        return toResponse(record);
    }

    private Hotel currentHotel(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);
        if (user.getHotels().isEmpty()) {
            throw new InvalidStepException("No property found for this account yet.");
        }
        return user.getHotels().get(0);
    }

    private String firstNonEmpty(String... values) {
        for (String v : values) {
            if (v != null && !v.isBlank()) return v;
        }
        return null;
    }

    private GstVerificationResponse toResponse(GstVerification r) {
        return new GstVerificationResponse(
                r.getId(),
                r.getGstin(),
                r.getStatus().name(),
                r.getLegalName(),
                r.getTradeName(),
                r.getGstinStatus(),
                r.getStateJurisdiction(),
                r.getRegistrationDate(),
                r.getFailureReason(),
                r.getCreatedAt() != null ? r.getCreatedAt().toString() : null
        );
    }
}
