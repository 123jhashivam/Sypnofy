package com.sypnofy.signup.service;

import com.sypnofy.signup.dto.SignupRequest;
import com.sypnofy.signup.dto.SignupResponse;
import com.sypnofy.signup.entity.Hotel;
import com.sypnofy.signup.entity.HotelType;
import com.sypnofy.signup.entity.RoomRange;
import com.sypnofy.signup.entity.User;
import com.sypnofy.signup.exception.EmailAlreadyExistsException;
import com.sypnofy.signup.exception.InvalidSignupException;
import com.sypnofy.signup.repository.HotelRepository;
import com.sypnofy.signup.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SignupService {

    private static final Logger log = LoggerFactory.getLogger(SignupService.class);

    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public SignupService(UserRepository userRepository,
                          HotelRepository hotelRepository,
                          PasswordEncoder passwordEncoder,
                          EmailService emailService) {
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new InvalidSignupException("Password and confirm password do not match");
        }

        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new EmailAlreadyExistsException(request.getEmail());
        }

        HotelType hotelType = HotelType.fromLabel(request.getHotelType());
        if (hotelType == null) {
            throw new InvalidSignupException("Unrecognized hotel type: " + request.getHotelType());
        }

        RoomRange roomRange = RoomRange.fromLabel(request.getRoomRange());
        if (roomRange == null) {
            throw new InvalidSignupException("Unrecognized room range: " + request.getRoomRange());
        }

        User user = new User();
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPhone(request.getPhone().trim());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);

        Hotel hotel = new Hotel();
        hotel.setOwner(user);
        hotel.setCompanyName(request.getCompanyName().trim());
        hotel.setHotelName(request.getHotelName().trim());
        hotel.setCity(request.getCity().trim());
        hotel.setHotelType(hotelType);
        hotel.setRoomRange(roomRange);
        hotel = hotelRepository.save(hotel);

        // Standard "you're registered" email. Wrapped in try/catch on purpose:
        // an SMTP hiccup should never roll back a successful signup — the
        // account and hotel rows are already committed at this point.
        try {
            emailService.sendSignupConfirmationEmail(
                    user.getEmail(),
                    user.getFirstName(),
                    hotel.getHotelName()
            );
        } catch (Exception e) {
            log.warn("Signup confirmation email failed to send to {}: {}", user.getEmail(), e.getMessage());
        }

        return new SignupResponse(
                user.getId(),
                hotel.getId(),
                user.getEmail(),
                "Account created successfully. A confirmation email has been sent to your inbox."
        );
    }
}
