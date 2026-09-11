package com.staykyc.backend.service;

import com.staykyc.backend.dto.PropertyRequest;
import com.staykyc.backend.model.Property;

import java.util.List;

public interface PropertyService {
    List<Property> getAllProperties();
    Property getPropertyById(Long id);
    Property createProperty(PropertyRequest request);
    Property updateProperty(Long id, PropertyRequest request);
    void deleteProperty(Long id);
}