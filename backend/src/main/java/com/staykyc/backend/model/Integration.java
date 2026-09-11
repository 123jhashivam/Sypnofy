package com.staykyc.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "integrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Integration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private String status = "Inactive";
}