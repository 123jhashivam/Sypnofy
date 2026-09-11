package com.staykyc.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class IntegrationRequest {

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Name is required")
    private String name;

    private String description;
    private String status;
}