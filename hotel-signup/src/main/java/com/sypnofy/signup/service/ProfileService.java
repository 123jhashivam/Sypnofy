package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.MeResponse;
import com.sypnofy.signup.entity.Hotel;
import com.sypnofy.signup.entity.User;
import com.sypnofy.signup.exception.InvalidCredentialsException;
import com.sypnofy.signup.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public MeResponse getCurrentUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        // A user can technically own more than one property later — for
        // now the dashboard just shows the first one they registered.
        Hotel hotel = user.getHotels().isEmpty() ? null : user.getHotels().get(0);

        return new MeResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().name(),
                hotel != null ? hotel.getId() : null,
                hotel != null ? hotel.getCompanyName() : null,
                hotel != null ? hotel.getHotelName() : null,
                hotel != null ? hotel.getCity() : null,
                hotel != null ? hotel.getHotelType().getLabel() : null,
                hotel != null ? hotel.getRoomRange().getLabel() : null
        );
    }
}
