package com.sypnofy.signup.service;

import com.sypnofy.signup.entity.VerifiedIdentity;
import com.sypnofy.signup.repository.VerifiedIdentityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;

@Service
public class IdentityVerificationService {

    private static final String CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    private final VerifiedIdentityRepository verifiedIdentityRepository;

    public IdentityVerificationService(VerifiedIdentityRepository verifiedIdentityRepository) {
        this.verifiedIdentityRepository = verifiedIdentityRepository;
    }

    @Transactional
    public VerifiedIdentity getOrCreate(String aadhaarHash, String verifiedName, String maskedIdNumber, Long guestAccountId) {
        return verifiedIdentityRepository.findByAadhaarHash(aadhaarHash)
                .orElseGet(() -> {
                    VerifiedIdentity identity = new VerifiedIdentity();
                    identity.setAadhaarHash(aadhaarHash);
                    identity.setVerifiedName(verifiedName);
                    identity.setMaskedIdNumber(maskedIdNumber);
                    identity.setGuestAccountId(guestAccountId);
                    identity.setVerificationCode(generateUniqueCode());
                    return verifiedIdentityRepository.save(identity);
                });
    }

    public java.util.Optional<VerifiedIdentity> lookupByCode(String code) {
        return verifiedIdentityRepository.findByVerificationCode(code.trim().toUpperCase());
    }

    public java.util.Optional<VerifiedIdentity> lookupByHash(String aadhaarHash) {
        return verifiedIdentityRepository.findByAadhaarHash(aadhaarHash);
    }

    public java.util.Optional<VerifiedIdentity> lookupById(Long id) {
        return verifiedIdentityRepository.findById(id);
    }

    private String generateUniqueCode() {
        String code;
        do {
            code = "SYNV-" + randomChars(6);
        } while (verifiedIdentityRepository.existsByVerificationCode(code));
        return code;
    }

    private String randomChars(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CODE_CHARS.charAt(RANDOM.nextInt(CODE_CHARS.length())));
        }
        return sb.toString();
    }
}