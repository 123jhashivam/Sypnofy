-- Run this once against your MySQL database, or let
-- spring.jpa.hibernate.ddl-auto=update create it for you in dev.

CREATE DATABASE IF NOT EXISTS sypnofy;
USE sypnofy;

CREATE TABLE IF NOT EXISTS users (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(100)  NOT NULL,
    last_name       VARCHAR(100)  NOT NULL,
    email           VARCHAR(255)  NOT NULL UNIQUE,
    phone           VARCHAR(10)   NOT NULL,
    password_hash   VARCHAR(255)  NOT NULL,
    email_verified  BOOLEAN       NOT NULL DEFAULT FALSE,
    role            VARCHAR(20)   NOT NULL DEFAULT 'USER',
    created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ADMIN / SUPERADMIN rows aren't created by the public signup endpoint.
-- Seed one manually once you're ready to build those pages, e.g.:
-- UPDATE users SET role = 'SUPERADMIN' WHERE email = 'you@sypnofy.com';

CREATE TABLE IF NOT EXISTS hotels (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    owner_id        BIGINT        NOT NULL,
    company_name    VARCHAR(150)  NOT NULL,
    hotel_name      VARCHAR(150)  NOT NULL,
    city            VARCHAR(100)  NOT NULL,
    hotel_type      VARCHAR(30)   NOT NULL,
    room_range      VARCHAR(20)   NOT NULL,
    gstin                    VARCHAR(20)   NULL,
    gst_verified             BOOLEAN       NOT NULL DEFAULT FALSE,
    gst_legal_name           VARCHAR(200)  NULL,
    gst_trade_name           VARCHAR(200)  NULL,
    gst_status               VARCHAR(30)   NULL,
    gst_state_jurisdiction   VARCHAR(150)  NULL,
    gst_registration_date    VARCHAR(30)   NULL,
    gst_verified_at          TIMESTAMP     NULL,
    created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_hotels_owner FOREIGN KEY (owner_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_hotels_owner_id ON hotels(owner_id);

CREATE TABLE IF NOT EXISTS otp_tokens (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(255)  NOT NULL,
    otp_code    VARCHAR(6)    NOT NULL,
    expires_at  TIMESTAMP     NOT NULL,
    used        BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_otp_tokens_email ON otp_tokens(email);

CREATE TABLE IF NOT EXISTS bookings (
    id                        BIGINT AUTO_INCREMENT PRIMARY KEY,
    hotel_id                  BIGINT        NOT NULL,
    booking_reference         VARCHAR(30)   NOT NULL,
    guest_name                VARCHAR(150)  NOT NULL,
    room_number               VARCHAR(20)   NOT NULL,
    foreign_guest             BOOLEAN       NOT NULL DEFAULT FALSE,
    kyc_status                VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    status                    VARCHAR(20)   NOT NULL DEFAULT 'UPCOMING',

    eta_at                    TIMESTAMP     NULL,
    pre_checkin_done          BOOLEAN       NOT NULL DEFAULT FALSE,
    consent_done              BOOLEAN       NOT NULL DEFAULT FALSE,
    kyc_done                  BOOLEAN       NOT NULL DEFAULT FALSE,
    room_assigned_done        BOOLEAN       NOT NULL DEFAULT FALSE,
    checked_in_at             TIMESTAMP     NULL,

    checkout_due_at           TIMESTAMP     NULL,
    checkout_timestamp_done   BOOLEAN       NOT NULL DEFAULT FALSE,
    room_status_done          BOOLEAN       NOT NULL DEFAULT FALSE,
    foreign_departure_done    BOOLEAN       NOT NULL DEFAULT FALSE,
    compliance_done           BOOLEAN       NOT NULL DEFAULT FALSE,
    receipt_sent_done         BOOLEAN       NOT NULL DEFAULT FALSE,
    checked_out_at            TIMESTAMP     NULL,

    created_at                TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bookings_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_bookings_hotel_status ON bookings(hotel_id, status);

CREATE TABLE IF NOT EXISTS guest_kyc (
    id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
    hotel_id           BIGINT        NULL,
    booking_id         BIGINT        NULL,
    guest_name         VARCHAR(150)  NOT NULL,
    doc_type           VARCHAR(20)   NOT NULL,
    session_id         VARCHAR(100)  NOT NULL,
    aadhaar_hash       VARCHAR(64)   NULL,
    guest_account_id      BIGINT     NULL,
    verified_identity_id  BIGINT     NULL,
    status             VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    verified_name      VARCHAR(150)  NULL,
    masked_id_number   VARCHAR(30)   NULL,
    failure_reason      VARCHAR(255) NULL,
    created_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verified_at        TIMESTAMP     NULL,
    CONSTRAINT fk_guest_kyc_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_guest_kyc_hotel ON guest_kyc(hotel_id);
CREATE INDEX idx_guest_kyc_aadhaar_hash ON guest_kyc(aadhaar_hash);

CREATE TABLE IF NOT EXISTS gst_verifications (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    hotel_id            BIGINT        NOT NULL,
    gstin               VARCHAR(20)   NOT NULL,
    status              VARCHAR(20)   NOT NULL,
    legal_name          VARCHAR(200)  NULL,
    trade_name          VARCHAR(200)  NULL,
    gstin_status        VARCHAR(30)   NULL,
    state_jurisdiction  VARCHAR(150)  NULL,
    registration_date   VARCHAR(30)   NULL,
    failure_reason      VARCHAR(255)  NULL,
    created_at          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_gst_verifications_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_gst_verifications_hotel ON gst_verifications(hotel_id);

CREATE TABLE IF NOT EXISTS verified_identities (
    id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
    aadhaar_hash         VARCHAR(64)   NOT NULL UNIQUE,
    verification_code    VARCHAR(20)   NOT NULL UNIQUE,
    verified_name        VARCHAR(150)  NULL,
    masked_id_number     VARCHAR(30)   NULL,
    guest_account_id     BIGINT        NULL,
    verified_at          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guest_accounts (
    id                     BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name             VARCHAR(100)  NOT NULL,
    last_name              VARCHAR(100)  NOT NULL,
    email                  VARCHAR(255)  NOT NULL UNIQUE,
    phone                  VARCHAR(10)   NOT NULL,
    password_hash          VARCHAR(255)  NOT NULL,
    verified_identity_id   BIGINT        NULL,
    created_at             TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);