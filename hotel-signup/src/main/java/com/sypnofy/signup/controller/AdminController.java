package com.sypnofy.signup.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Placeholder only — no admin/superadmin pages exist yet on the frontend.
// This just proves the role wiring works end to end (SecurityConfig +
// JwtAuthFilter + @PreAuthorize). Replace/extend with real endpoints
// (e.g. list all hotels, manage users, promote an admin) when those
// pages get built.
@RestController
@RequestMapping("/api")
public class AdminController {

    // Reachable by ADMIN and SUPERADMIN (also enforced in SecurityConfig
    // for /api/admin/**, @PreAuthorize here is the extra method-level guard)
    @GetMapping("/admin/ping")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    public String adminPing() {
        return "You're authenticated as ADMIN or SUPERADMIN.";
    }

    // Reachable by SUPERADMIN only
    @GetMapping("/superadmin/ping")
    @PreAuthorize("hasRole('SUPERADMIN')")
    public String superAdminPing() {
        return "You're authenticated as SUPERADMIN.";
    }
}
