package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.StartSelfKycRequest;
import com.sypnofy.signup.dto.VerificationCodeResponse;
import com.sypnofy.signup.entity.GuestAccount;
import com.sypnofy.signup.entity.GuestKyc;
import com.sypnofy.signup.entity.KycVerificationStatus;
import com.sypnofy.signup.entity.VerifiedIdentity;
import com.sypnofy.signup.exception.DigiLockerException;
import com.sypnofy.signup.exception.InvalidCredentialsException;
import com.sypnofy.signup.exception.InvalidStepException;
import com.sypnofy.signup.repository.GuestAccountRepository;
import com.sypnofy.signup.repository.GuestKycRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;

@Service
public class GuestSelfKycService {

    private final GuestAccountRepository guestAccountRepository;
    private final GuestKycRepository guestKycRepository;
    private final DigiLockerClient digiLockerClient;
    private final IdentityVerificationService identityVerificationService;
    private final String redirectUrl;

    public GuestSelfKycService(GuestAccountRepository guestAccountRepository,
                                GuestKycRepository guestKycRepository,
                                DigiLockerClient digiLockerClient,
                                IdentityVerificationService identityVerificationService,
                                @Value("${sandbox.digilocker.redirect-url}") String redirectUrl) {
        this.guestAccountRepository = guestAccountRepository;
        this.guestKycRepository = guestKycRepository;
        this.digiLockerClient = digiLockerClient;
        this.identityVerificationService = identityVerificationService;
        this.redirectUrl = redirectUrl;
    }

    @Transactional
    public Map<String, Object> start(String guestEmail, StartSelfKycRequest request) {
        GuestAccount guest = currentGuest(guestEmail);
        String aadhaarHash = hashValue(request.getAadhaarNumber());

        var cached = identityVerificationService.lookupByHash(aadhaarHash);
        if (cached.isPresent()) {
            VerifiedIdentity identity = cached.get();
            linkGuestToIdentity(guest, identity);

            return Map.of(
                    "status", "VERIFIED",
                    "verificationCode", identity.getVerificationCode(),
                    "verifiedName", String.valueOf(identity.getVerifiedName()),
                    "maskedIdNumber", String.valueOf(identity.getMaskedIdNumber())
            );
        }

        DigiLockerClient.SessionInitResult session =
                digiLockerClient.initiateSession(List.of("aadhaar", "pan"), redirectUrl);

        GuestKyc kyc = new GuestKyc();
        kyc.setHotel(null);
        kyc.setGuestAccountId(guest.getId());
        kyc.setGuestName(guest.getFirstName() + " " + guest.getLastName());
        kyc.setDocType("aadhaar");
        kyc.setSessionId(session.sessionId());
        kyc.setAadhaarHash(aadhaarHash);
        kyc.setStatus(KycVerificationStatus.PENDING);
        kyc = guestKycRepository.save(kyc);

        return Map.of(
                "status", "PENDING",
                "kycId", kyc.getId(),
                "authorizationUrl", session.authorizationUrl()
        );
    }

    @Transactional
    public VerificationCodeResponse checkStatus(String guestEmail, Long kycId) {
        GuestAccount guest = currentGuest(guestEmail);

        GuestKyc kyc = guestKycRepository.findById(kycId)
                .orElseThrow(() -> new InvalidStepException("KYC record not found: " + kycId));

        if (kyc.getGuestAccountId() == null || !kyc.getGuestAccountId().equals(guest.getId())) {
            throw new InvalidCredentialsException();
        }

        if (kyc.getStatus() == KycVerificationStatus.VERIFIED && kyc.getVerifiedIdentityId() != null) {
            var identity = identityVerificationService.lookupById(kyc.getVerifiedIdentityId());
            if (identity.isPresent()) {
                return new VerificationCodeResponse(true, identity.get().getVerificationCode(),
                        identity.get().getVerifiedName(), identity.get().getMaskedIdNumber(),
                        identity.get().getVerifiedAt().toString());
            }
        }

        if (kyc.getStatus() != KycVerificationStatus.PENDING) {
            return new VerificationCodeResponse(false, null, null, null, null);
        }

        try {
            String xml = digiLockerClient.fetchDocumentXml(kyc.getSessionId(), kyc.getDocType());
            if (xml == null) {
                return new VerificationCodeResponse(false, null, null, null, null);
            }

            AadhaarDetails details = parseAadhaarXml(xml);

            VerifiedIdentity identity = identityVerificationService.getOrCreate(
                    kyc.getAadhaarHash(), details.name(), details.maskedUid(), guest.getId());

            kyc.setStatus(KycVerificationStatus.VERIFIED);
            kyc.setVerifiedName(details.name());
            kyc.setMaskedIdNumber(details.maskedUid());
            kyc.setVerifiedIdentityId(identity.getId());
            kyc.setVerifiedAt(Instant.now());
            guestKycRepository.save(kyc);

            linkGuestToIdentity(guest, identity);

            return new VerificationCodeResponse(true, identity.getVerificationCode(),
                    identity.getVerifiedName(), identity.getMaskedIdNumber(), identity.getVerifiedAt().toString());

        } catch (DigiLockerException e) {
            kyc.setStatus(KycVerificationStatus.FAILED);
            kyc.setFailureReason(e.getMessage());
            guestKycRepository.save(kyc);
            return new VerificationCodeResponse(false, null, null, null, null);
        }
    }

    private void linkGuestToIdentity(GuestAccount guest, VerifiedIdentity identity) {
        if (guest.getVerifiedIdentityId() == null) {
            guest.setVerifiedIdentityId(identity.getId());
            guestAccountRepository.save(guest);
        }
    }

    private GuestAccount currentGuest(String email) {
        return guestAccountRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);
    }

    private String hashValue(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            throw new InvalidStepException("Could not process Aadhaar number.");
        }
    }

    private record AadhaarDetails(String name, String maskedUid) {}

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
            String uid = uidData.getAttribute("uid");

            var poiList = uidData.getElementsByTagName("Poi");
            String name = poiList.getLength() > 0
                    ? ((org.w3c.dom.Element) poiList.item(0)).getAttribute("name")
                    : null;

            return new AadhaarDetails(name, uid);
        } catch (Exception e) {
            throw new DigiLockerException("Could not parse Aadhaar XML: " + e.getMessage(), e);
        }
    }
}