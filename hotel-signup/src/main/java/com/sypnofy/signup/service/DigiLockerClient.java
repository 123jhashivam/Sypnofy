package com.sypnofy.signup.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sypnofy.signup.exception.DigiLockerException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Thin wrapper around Sandbox.co.in's real DigiLocker KYC API.
 * Docs: https://developer.sandbox.co.in/api-reference/kyc/digilocker
 *
 * Flow:
 *   1. authenticate()        -> JWT access token (valid 24h, cached in memory)
 *   2. initiateSession(...)  -> DigiLocker consent link + session_id
 *      -> frontend redirects the guest to that link; DigiLocker redirects
 *         back to your redirect_url once consent is given
 *   3. fetchDocument(...)    -> pull the verified document once consent is done.
 *      Returns a 523 "Invalid session status: created" error if the guest
 *      hasn't completed consent yet — that's treated as "still pending",
 *      not a hard failure.
 */
@Component
public class DigiLockerClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String baseUrl;
    private final String apiKey;
    private final String apiSecret;

    private String cachedAccessToken;
    private Instant tokenExpiresAt = Instant.EPOCH;

    public DigiLockerClient(
            @Value("${sandbox.digilocker.base-url}") String baseUrl,
            @Value("${sandbox.digilocker.api-key}") String apiKey,
            @Value("${sandbox.digilocker.api-secret}") String apiSecret
    ) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    public record SessionInitResult(String authorizationUrl, String sessionId) {}

    // --- Public API ---

    public SessionInitResult initiateSession(List<String> docTypes, String redirectUrl) {
        String token = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token); // NOT a bearer token — no "Bearer " prefix
        headers.set("x-api-key", apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("@entity", "in.co.sandbox.kyc.digilocker.session.request");
        body.put("flow", "signin");
        body.put("doc_types", docTypes);
        body.put("redirect_url", redirectUrl);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    baseUrl + "/kyc/digilocker/sessions/init",
                    HttpMethod.POST,
                    new HttpEntity<>(body, headers),
                    String.class
            );
            JsonNode data = objectMapper.readTree(response.getBody()).path("data");
            return new SessionInitResult(
                    data.path("authorization_url").asText(),
                    data.path("session_id").asText()
            );
        } catch (Exception e) {
            throw new DigiLockerException("Could not start DigiLocker verification: " + e.getMessage(), e);
        }
    }

    /**
     * Returns the raw signed Aadhaar XML string, or null if the guest hasn't
     * completed DigiLocker consent yet (still pending).
     */
    public String fetchDocumentXml(String sessionId, String docType) {
        String token = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        headers.set("x-api-key", apiKey);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    baseUrl + "/kyc/digilocker/sessions/" + sessionId + "/documents/" + docType,
                    HttpMethod.GET,
                    new HttpEntity<>(headers),
                    String.class
            );
            JsonNode data = objectMapper.readTree(response.getBody()).path("data");
            String fileUrl = data.path("url").asText(null);
            if (fileUrl == null || fileUrl.isBlank()) {
                return null;
            }

            // The document URL returns the signed XML file directly
            return restTemplate.getForObject(fileUrl, String.class);

        } catch (HttpClientErrorException e) {
            if (e.getResponseBodyAsString().contains("Invalid session status")) {
                return null; // still pending — not a failure
            }
            throw new DigiLockerException("DigiLocker document fetch failed: " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            throw new DigiLockerException("DigiLocker document fetch failed: " + e.getMessage(), e);
        }
    }

    // --- Token handling ---

    private synchronized String getAccessToken() {
        if (cachedAccessToken != null && Instant.now().isBefore(tokenExpiresAt)) {
            return cachedAccessToken;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);
        headers.set("x-api-secret", apiSecret);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    baseUrl + "/authenticate",
                    HttpMethod.POST,
                    new HttpEntity<>(headers),
                    String.class
            );
            JsonNode data = objectMapper.readTree(response.getBody()).path("data");
            cachedAccessToken = data.path("access_token").asText();
            // Token is valid 24h — refresh a little early to be safe
            tokenExpiresAt = Instant.now().plusSeconds(23 * 3600);
            return cachedAccessToken;
        } catch (Exception e) {
            throw new DigiLockerException("Could not authenticate with Sandbox.co.in: " + e.getMessage(), e);
        }
    }
}
