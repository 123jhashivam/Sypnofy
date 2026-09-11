package com.sypnofy.signup.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final String fromAddress;

    public EmailService(JavaMailSender mailSender,
                         @Value("${app.mail.from}") String fromAddress) {
        this.mailSender = mailSender;
        this.fromAddress = fromAddress;
    }

    public void sendOtpEmail(String toEmail, String otpCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(toEmail);
        message.setSubject("Your Sypnofy login code");
        message.setText(
            "Your one-time login code is: " + otpCode + "\n\n" +
            "This code expires in 5 minutes. If you didn't request this, you can ignore this email."
        );
        mailSender.send(message);
    }

    public void sendSignupConfirmationEmail(String toEmail, String firstName, String hotelName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(toEmail);
        message.setSubject("Welcome to Sypnofy — your account is ready");
        message.setText(
            "Hi " + firstName + ",\n\n" +
            "You've successfully registered on Sypnofy for " + hotelName + ".\n\n" +
            "You can now sign in anytime using this email address.\n\n" +
            "If you didn't create this account, please ignore this email or contact our support team.\n\n" +
            "— Team Sypnofy"
        );
        mailSender.send(message);
    }
}
