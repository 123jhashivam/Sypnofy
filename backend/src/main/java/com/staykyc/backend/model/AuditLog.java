package com.staykyc.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String actor;         // email of user, or "system"
    private String action;
    private String resource;
    private String result;        // Success, Flagged, Failed
    private String ipAddress;

    private LocalDateTime timestamp = LocalDateTime.now();
}