package org.example.nutribookbe.service;

import org.example.nutribookbe.dto.PasswordResetDTO;
import org.example.nutribookbe.entity.PasswordResetToken;
import org.example.nutribookbe.entity.User;
import org.example.nutribookbe.exception.ResourceNotFoundException;
import org.example.nutribookbe.exception.TokenNotFoundException;
import org.example.nutribookbe.repository.PasswordResetTokenRepository;
import org.example.nutribookbe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordResetTokenRepository passwordTokenRepository;

    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository repo, PasswordResetTokenRepository passwordTokenRepository, EmailService emailService) {
        this.userRepository = repo;
        this.passwordTokenRepository = passwordTokenRepository;
        this.emailService = emailService;
    }

    public String resetPassword(PasswordResetDTO passwordResetDto) {
        PasswordResetToken resetToken = passwordTokenRepository.findByToken(passwordResetDto.getToken());
        if (resetToken == null) {
            throw new TokenNotFoundException("Invalid reset password token");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = resetToken.getUser();
        user.setPassword(encoder.encode(passwordResetDto.getNewPassword())); // Remember to encrypt this password!
        userRepository.save(user);
        passwordTokenRepository.delete(resetToken);

        return "Password reset successfully";
    }

    public String initiatePasswordRecovery(String email) {
        if (email.isEmpty()) {
            return "Email field left blank";
        } else {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                return "No user found with email: " + email;
            }
            String token = UUID.randomUUID().toString();
            PasswordResetToken resetToken = new PasswordResetToken(token, user);
            passwordTokenRepository.save(resetToken);

            String url = "http://localhost:3000/Reset/" + token;

            String subject = "Nutri-Book Password Recovery";
            String content = "To reset your password, click the link below:\n" + url;

            emailService.sendEmail(user.getEmail(), subject, content);
            return "An email with a password reset link has been sent.";

        }

    }

    //CREATE USER
    public User createUser(User user) {
        //Check if username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        //check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        //save user
        return userRepository.save(user);
    }

    //FIND User BY X
    public Optional<User> findByID(Long id) {
        return userRepository.findById(id);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    //UPDATE USER DETAILS
    //UPDATE USERNAME
    public void updateUsername(Long id, String newUsername, String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        //Get the User the ID applies to
        Optional<User> user = findByID(id);

        //check if user is empty or null i.e. does it exist
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User", "id", id);
            //Check if requested username already exists
        } else if (newUsername.isEmpty()) {
            throw new IllegalArgumentException("New username field left blank.");
            //Check if New Username DOES NOT match old username
        } else if (user.get().getUsername().equals(newUsername)) {
            throw new IllegalArgumentException("No change to Username.");
        } else {
            if (userRepository.existsByUsername(newUsername)) {
                throw new IllegalArgumentException("Username already exists");
            } else {
                // Check Given Password
                if (encoder.matches(password, user.get().getPassword())) {
                    //save changes to username
                    user.get().setUsername(newUsername);
                    userRepository.save(user.get());
                } else {
                    throw new IllegalArgumentException("Incorrect password");
                }
            }

        }
    }

    //UPDATE EMAIL
    public void updateEmail(Long id, String newEmail, String oldPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        //Get the User the ID applies to
        Optional<User> user = findByID(id);

        //check if user is empty or null i.e. does it exist
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User", "id", id);
            //Check if field was left blank
        } else if (newEmail.isEmpty()) {
            throw new IllegalArgumentException("New Email field left blank.");
            //Check if email has not changed
        } else if (user.get().getEmail().equals(newEmail)) {
            throw new IllegalArgumentException("No change to email");
        } else {
            System.out.println("MET POINT!");
            //Check if email already exists
            if (userRepository.existsByEmail(newEmail)) {
                throw new IllegalArgumentException("Email already exists");
            }
            // Check Given Password
            if (encoder.matches(oldPassword, user.get().getPassword())) {
                //save changes to username
                user.get().setEmail(newEmail);
                userRepository.save(user.get());
            } else {
                //Throw error on wrong password.
                throw new IllegalArgumentException("Incorrect password");
            }
        }
    }

    //UPDATE PASSWORD
    public void updatePassword(Long id, String newPassword, String oldPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        //Get the User the ID applies to
        Optional<User> user = findByID(id);

        //check if user is empty or null i.e. does it exist
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User", "id", id);
            //Check if field was left blank
        } else if (newPassword.isEmpty()) {
            throw new IllegalArgumentException("New Password field was left blank.");
        } else {
            // Check Given Password
            if (encoder.matches(oldPassword, user.get().getPassword())) {
                //Encode new password and save to Database
                user.get().setPassword(encoder.encode(newPassword));
                userRepository.save(user.get());
            } else {
                //Throw error on wrong password.
                throw new IllegalArgumentException("Incorrect password");
            }
        }
    }

}
