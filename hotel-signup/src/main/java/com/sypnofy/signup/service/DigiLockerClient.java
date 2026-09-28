package com.sypnofy.signup.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sypnofy.signup.exception.DigiLockerException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public SessionInitResult initiateSession(List<String> docTypes, String redirectUrl) {
        String token = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token);
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

            return restTemplate.getForObject(fileUrl, String.class);

        } catch (HttpStatusCodeException e) {
            if (e.getResponseBodyAsString().contains("Invalid session status")) {
                return null; // still pending — not a failure
            }
            throw new DigiLockerException("DigiLocker document fetch failed: " + e.getResponseBodyAsString(), e);
        } catch (ResourceAccessException e) {
            return null; // transient network issue — treat as still pending
        } catch (Exception e) {
            throw new DigiLockerException("DigiLocker document fetch failed: " + e.getMessage(), e);
        }
    }

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
            tokenExpiresAt = Instant.now().plusSeconds(23 * 3600);
            return cachedAccessToken;
        } catch (Exception e) {
            throw new DigiLockerException("Could not authenticate with Sandbox.co.in: " + e.getMessage(), e);
        }
    }
}