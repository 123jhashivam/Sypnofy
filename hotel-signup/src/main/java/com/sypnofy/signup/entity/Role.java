package com.sypnofy.signup.entity;

public enum Role {
    // Regular hotel owner — everyone who signs up through the form gets this.
    USER,

    // Reserved for internal staff pages — not built yet, but the model,
    // token, and route-guarding all already understand this role.
    ADMIN,

    // Reserved for the highest-privilege internal role (e.g. can manage
    // other admins). Also not wired to any page yet.
    SUPERADMIN
}
