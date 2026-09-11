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
