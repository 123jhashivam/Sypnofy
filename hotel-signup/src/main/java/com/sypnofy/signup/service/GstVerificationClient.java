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
import java.util.Map;

/**
 * Thin wrapper around Sandbox.co.in's GST Public API (no taxpayer consent
 * needed — it just looks up a GSTIN on the public GST portal).
 * Docs: https://developer.sandbox.co.in/reference/search-gstin-api
 *
 * Kept as its own client (separate token cache) rather than sharing
 * DigiLockerClient's, since this call needs an extra x-api-version header
 * that the DigiLocker endpoints don't use.
 */
@Component
public class GstVerificationClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String baseUrl;
    private final String apiKey;
    private final String apiSecret;

    private String cachedAccessToken;
    private Instant tokenExpiresAt = Instant.EPOCH;

    public GstVerificationClient(
            @Value("${sandbox.gst.base-url}") String baseUrl,
            @Value("${sandbox.gst.api-key}") String apiKey,
            @Value("${sandbox.gst.api-secret}") String apiSecret
    ) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /** Returns the raw "data" node from a successful verify call, or throws on a hard failure. */
    public JsonNode verifyGstin(String gstin) {
        String token = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token); // no "Bearer " prefix
        headers.set("x-api-key", apiKey);
        headers.set("x-api-version", "1.0");

        Map<String, Object> body = new HashMap<>();
        body.put("gstin", gstin);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    baseUrl + "/gst/compliance/public/gstin/verify",
                    HttpMethod.POST,
                    new HttpEntity<>(body, headers),
                    String.class
            );
            return objectMapper.readTree(response.getBody()).path("data");
        } catch (HttpClientErrorException.NotFound e) {
            return null; // "FO8000 No records found" — GSTIN doesn't exist
        } catch (Exception e) {
            throw new DigiLockerException("GST verification failed: " + e.getMessage(), e);
        }
    }

    private synchronized String getAccessToken() {
        if (cachedAccessToken != null && Instant.now().isBefore(tokenExpiresAt)) {
            return cachedAccessToken;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);
        headers.set("x-api-secret", apiSecret);
        headers.set("x-api-version", "1.0");

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    baseUrl + "/authenticate",
                    HttpMethod.POST,
                    new HttpEntity<>(headers),
                    String.class
            );
            JsonNode data = objectMapper.readTree(response.getBody()).path("data");
            cachedAccessToken = data.path("access_token").asText();
            tokenExpiresAt = Instant.now().plusSeconds(23 * 3600); // valid 24h, refresh a bit early
            return cachedAccessToken;
        } catch (Exception e) {
            throw new DigiLockerException("Could not authenticate with Sandbox.co.in: " + e.getMessage(), e);
        }
    }
}
