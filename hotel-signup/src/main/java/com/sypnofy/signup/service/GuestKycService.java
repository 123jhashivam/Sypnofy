package com.sypnofy.signup.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.sypnofy.signup.dto.KycResponse;
import com.sypnofy.signup.dto.StartKycRequest;
import com.sypnofy.signup.entity.GuestKyc;
import com.sypnofy.signup.entity.Hotel;
import com.sypnofy.signup.entity.KycVerificationStatus;
import com.sypnofy.signup.entity.User;
import com.sypnofy.signup.exception.DigiLockerException;
import com.sypnofy.signup.exception.InvalidCredentialsException;
import com.sypnofy.signup.exception.InvalidStepException;
import com.sypnofy.signup.repository.GuestKycRepository;
import com.sypnofy.signup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class GuestKycService {

    private final GuestKycRepository guestKycRepository;
    private final UserRepository userRepository;
    private final DigiLockerClient digiLockerClient;
    private final String redirectUrl;

    public GuestKycService(GuestKycRepository guestKycRepository,
                            UserRepository userRepository,
                            DigiLockerClient digiLockerClient,
                            @Value("${sandbox.digilocker.redirect-url}") String redirectUrl) {
        this.guestKycRepository = guestKycRepository;
        this.userRepository = userRepository;
        this.digiLockerClient = digiLockerClient;
        this.redirectUrl = redirectUrl;
    }

    public List<KycResponse> listForHotel(String email) {
        Hotel hotel = currentHotel(email);
        return guestKycRepository.findByHotelIdOrderByCreatedAtDesc(hotel.getId())
                .stream()
                .map(k -> toResponse(k, null))
                .toList();
    }

    @Transactional
    public KycResponse start(String email, StartKycRequest request) {
        Hotel hotel = currentHotel(email);

        // Only Aadhaar is supported right now.
        String primaryDocType = "aadhaar";

        DigiLockerClient.SessionInitResult session =
                digiLockerClient.initiateSession(List.of("aadhaar"), redirectUrl);

        GuestKyc kyc = new GuestKyc();
        kyc.setHotel(hotel);
        kyc.setBookingId(request.getBookingId());
        kyc.setGuestName(request.getGuestName().trim());
        kyc.setDocType(primaryDocType);
        kyc.setSessionId(session.sessionId());
        kyc.setStatus(KycVerificationStatus.PENDING);
        kyc = guestKycRepository.save(kyc);

        return toResponse(kyc, session.authorizationUrl());
    }

    @Transactional
    public KycResponse checkStatus(Long kycId) {
        GuestKyc kyc = guestKycRepository.findById(kycId)
                .orElseThrow(() -> new InvalidStepException("KYC record not found: " + kycId));

        if (kyc.getStatus() != KycVerificationStatus.PENDING) {
            return toResponse(kyc, null); // already resolved, nothing to check
        }

        try {
            String xml = digiLockerClient.fetchDocumentXml(kyc.getSessionId(), kyc.getDocType());

            if (xml == null) {
                // Guest hasn't completed DigiLocker consent yet
                return toResponse(kyc, null);
            }

            AadhaarDetails details = parseAadhaarXml(xml);

            kyc.setStatus(KycVerificationStatus.VERIFIED);
            kyc.setVerifiedName(details.name());
            kyc.setMaskedIdNumber(details.maskedUid());
            kyc.setVerifiedAt(Instant.now());
            guestKycRepository.save(kyc);

        } catch (DigiLockerException e) {
            kyc.setStatus(KycVerificationStatus.FAILED);
            kyc.setFailureReason(e.getMessage());
            guestKycRepository.save(kyc);
        }

        return toResponse(kyc, null);
    }

    private record AadhaarDetails(String name, String maskedUid) {}

    // Aadhaar XML uses a KycRes envelope: <UidData uid="xxxxxxxx1234">
    // <Poi name="..." dob="..." gender="..."/></UidData>
    private AadhaarDetails parseAadhaarXml(String xml) {
        try {
            var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
            factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            var builder = factory.newDocumentBuilder();
            var doc = builder.parse(new org.xml.sax.InputSource(new java.io.StringReader(xml)));

            var uidDataList = doc.getElementsByTagName("UidData");
            if (uidDataList.getLength() == 0) {
                throw new DigiLockerException("Unexpected Aadhaar XML — no UidData element found.");
            }
            var uidData = (org.w3c.dom.Element) uidDataList.item(0);
            String uid = uidData.getAttribute("uid"); // already masked by DigiLocker, e.g. "xxxxxxxx1234"

            var poiList = uidData.getElementsByTagName("Poi");
            String name = poiList.getLength() > 0
                    ? ((org.w3c.dom.Element) poiList.item(0)).getAttribute("name")
                    : null;

            return new AadhaarDetails(name, uid);
        } catch (Exception e) {
            throw new DigiLockerException("Could not parse Aadhaar XML: " + e.getMessage(), e);
        }
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

    private String firstNonEmpty(String... values) {
        for (String v : values) {
            if (v != null && !v.isBlank()) return v;
        }
        return null;
    }

    private String maskIdNumber(String idNumber) {
        if (idNumber == null || idNumber.length() < 4) return idNumber;
        String last4 = idNumber.substring(idNumber.length() - 4);
        return "XXXX-XXXX-" + last4;
    }

    private KycResponse toResponse(GuestKyc kyc, String authorizationUrl) {
        return new KycResponse(
                kyc.getId(),
                kyc.getGuestName(),
                kyc.getDocType(),
                kyc.getStatus().name(),
                authorizationUrl,
                kyc.getVerifiedName(),
                kyc.getMaskedIdNumber(),
                kyc.getFailureReason(),
                kyc.getCreatedAt() != null ? kyc.getCreatedAt().toString() : null,
                kyc.getVerifiedAt() != null ? kyc.getVerifiedAt().toString() : null
        );
    }
}
