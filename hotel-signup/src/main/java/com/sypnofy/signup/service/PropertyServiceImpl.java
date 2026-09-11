package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.PropertyRequest;
import com.sypnofy.signup.entity.Property;
import com.sypnofy.signup.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Property not found with id: " + id));
    }

    @Override
    public Property createProperty(PropertyRequest request) {
        Property property = new Property();
        mapRequestToEntity(request, property);
        return propertyRepository.save(property);
    }

    @Override
    public Property updateProperty(Long id, PropertyRequest request) {
        Property property = getPropertyById(id);
        mapRequestToEntity(request, property);
        return propertyRepository.save(property);
    }

    @Override
    public void deleteProperty(Long id) {
        propertyRepository.delete(getPropertyById(id));
    }

    private void mapRequestToEntity(PropertyRequest request, Property property) {
        property.setName(request.getName());
        property.setLegalEntity(request.getLegalEntity());
        property.setBrand(request.getBrand());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPin(request.getPin());
        property.setGstin(request.getGstin());
        property.setPan(request.getPan());
        property.setContactNumber(request.getContactNumber());
        property.setEmergencyContact(request.getEmergencyContact());
        if (request.getTimezone() != null) property.setTimezone(request.getTimezone());
        if (request.getCheckInTime() != null) property.setCheckInTime(request.getCheckInTime());
        if (request.getCheckOutTime() != null) property.setCheckOutTime(request.getCheckOutTime());
        if (request.getRooms() != null) property.setRooms(request.getRooms());
        if (request.getStatus() != null) property.setStatus(request.getStatus());
    }
}