package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.PropertyRequest;
import com.sypnofy.signup.entity.Property;
import java.util.List;

public interface PropertyService {
    List<Property> getAllProperties();
    Property getPropertyById(Long id);
    Property createProperty(PropertyRequest request);
    Property updateProperty(Long id, PropertyRequest request);
    void deleteProperty(Long id);
}