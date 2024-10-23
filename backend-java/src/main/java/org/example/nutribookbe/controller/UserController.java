package org.example.nutribookbe.controller;

import org.example.nutribookbe.dto.EmailDTO;
import org.example.nutribookbe.dto.PasswordResetDTO;
import org.example.nutribookbe.dto.UserPostDTO;
import org.example.nutribookbe.entity.Allergy;
import org.example.nutribookbe.entity.Recipe;
import org.example.nutribookbe.entity.User;
import org.example.nutribookbe.exception.ResourceNotFoundException;
import org.example.nutribookbe.repository.AllergyRepository;
import org.example.nutribookbe.repository.UserRepository;
import org.example.nutribookbe.service.AllergyService;
import org.example.nutribookbe.service.RecipeService;
import org.example.nutribookbe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {
    private final AllergyService allergyService;
    private final UserService userService;
    private final UserRepository repo;
    private final AllergyRepository allergyRepository;
    private final RecipeService recipeService;

    @Autowired
    public UserController(AllergyService allergyService, UserService userService, UserRepository repo, AllergyRepository allergyRepository, RecipeService recipeService) {
        this.allergyService = allergyService;
        this.userService = userService;
        this.repo = repo;
        this.allergyRepository = allergyRepository;
        this.recipeService = recipeService;
    }

    //REGISTRATION
    @PostMapping("/user/register")
    public ResponseEntity<String> createUser(@RequestBody UserPostDTO newUserDTO) {
        if (newUserDTO == null) {
            return new ResponseEntity<>("Request body cannot be null", HttpStatus.BAD_REQUEST);
        }
        if (Objects.equals(newUserDTO.getUsername(), "") || Objects.equals(newUserDTO.getEmail(), "")) {
            return new ResponseEntity<>("Value(s) provided are empty", HttpStatus.BAD_REQUEST);
        }
        if (repo.existsByUsername(newUserDTO.getUsername())) {
            return new ResponseEntity<>("Username is already in use", HttpStatus.BAD_REQUEST);
        }
        if (repo.existsByEmail(newUserDTO.getEmail())) {
            return new ResponseEntity<>("Email is already in use", HttpStatus.BAD_REQUEST);
        }
        if (newUserDTO.getUsername() == null || newUserDTO.getEmail() == null || newUserDTO.getPassword() == null) {
            return new ResponseEntity<>("Null values Provided", HttpStatus.BAD_REQUEST);
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User newUser = new User(newUserDTO.getUsername(), newUserDTO.getEmail(), encoder.encode(newUserDTO.getPassword()));
        userService.createUser(newUser);
        return new ResponseEntity<>("User: " + newUser.getUsername() + " created successfully.", HttpStatus.CREATED);
    }

    @GetMapping("/recipe/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipeOptional = recipeService.getRecipeById(id);
        return recipeOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping("/user/recovery")
    public ResponseEntity<?> resetPassword(@RequestBody EmailDTO emailDTO) {
        try {
            String message = userService.initiatePasswordRecovery(emailDTO.getEmail());
            return ResponseEntity.ok(message);
        } catch (MailException e) {
            return new ResponseEntity<>("Failed to initiate password recovery", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/allUsersAllergy")
    public ResponseEntity<List<Allergy>> getAllAllergies() {
        List<Allergy> allergies = allergyService.getAllAllergies();
        return ResponseEntity.ok(allergies);
    }

    // Endpoint to find allergy by ID
    @GetMapping("/user/allergy/{email}")
    public ResponseEntity<List<Allergy>> getAllergiesByEmail(@PathVariable String email) {
        List<Allergy> allergies = allergyService.getAllergiesByEmail(email);
        return new ResponseEntity<>(allergies, HttpStatus.OK);
    }

    // Endpoint to create a new allergy
    @PostMapping("/user/createAllergy")
    public ResponseEntity<Allergy> createAllergy(@RequestBody Allergy allergy) {
        Allergy createdAllergy = allergyService.createAllergy(allergy);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAllergy);
    }

    @DeleteMapping("/user/allergy/{id}")
    public ResponseEntity<Void> deleteAllergy(@PathVariable Long id) {
        allergyService.deleteAllergy(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to update an existing allergy by email
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/user/allergy/{email}")
    public ResponseEntity<Allergy> updateAllergyByEmail(@PathVariable String email, @RequestBody Allergy updatedAllergy) {
        try {
            Allergy allergy = allergyService.updateAllergyByEmail(email, updatedAllergy);
            return ResponseEntity.ok(allergy);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDTO passwordResetDto) {
        String message = userService.resetPassword(passwordResetDto);
        return ResponseEntity.ok(message);
    }

    //Get User by ID
    @GetMapping("/get-user/{id}")
    public Optional<User> getUserById(@PathVariable(value = "id") Long id) {
        return userService.findByID(id);
    }

    //Get User by Email
    @GetMapping("/user/find-by-email/{email}")
    public Optional<Long> getUserByEmail(@PathVariable(value = "email") String email) {
        return Optional.ofNullable(userService.findByEmail(email).getId());
    }

    //CHANGE ACCOUNT DETAILS
    @PostMapping("/user/change-username/{id}")
    public ResponseEntity<String> changeUsername(@PathVariable Long id, @RequestBody Map<String, String> credentials) {
        String newUsername = credentials.get("newUsername");
        String password = credentials.get("oldPassword");

        userService.updateUsername(id, newUsername, password);

        return new ResponseEntity<>("Username updated to: " + newUsername, HttpStatus.OK);
    }

    @PostMapping("/user/change-email/{id}")
    public ResponseEntity<String> changeEmail(@PathVariable Long id, @RequestBody Map<String, String> credentials) {
        String newEmail = credentials.get("newEmail");
        String password = credentials.get("oldPassword");

        userService.updateEmail(id, newEmail, password);

        return new ResponseEntity<>("Email updated to: " + newEmail, HttpStatus.OK);
    }

    @PostMapping("/user/change-password/{id}")
    public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody Map<String, String> credentials) {
        String newPassword = credentials.get("newPassword");
        String oldPassword = credentials.get("oldPassword");

        userService.updatePassword(id , newPassword, oldPassword);

        return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);

    }
}
