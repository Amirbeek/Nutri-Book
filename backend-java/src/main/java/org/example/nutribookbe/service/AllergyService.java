package org.example.nutribookbe.service;

import org.example.nutribookbe.entity.Allergy;
import org.example.nutribookbe.exception.ResourceNotFoundException;
import org.example.nutribookbe.repository.AllergyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AllergyService {

    private final AllergyRepository allergyRepository;

    @Autowired
    public AllergyService(AllergyRepository allergyRepository) {
        this.allergyRepository = allergyRepository;
    }
    public Allergy createAllergy(Allergy allergy) {
        Allergy existingAllergy = allergyRepository.findByEmail(allergy.getEmail());
        if (existingAllergy != null) {
            throw new RuntimeException("Allergy already exists for this email address");
        }

        return allergyRepository.save(allergy);
    }
    // UPDATE by Email
    public Allergy updateAllergyByEmail(String email, Allergy updatedAllergy) {
        Allergy existingAllergy = allergyRepository.findByEmail(email);
        if (existingAllergy == null) {
            throw new ResourceNotFoundException("Allergy", "email", email);
        }

        // Update fields with new values
        existingAllergy.setCommon_allergies(updatedAllergy.getCommon_allergies());
        existingAllergy.setOther_allergies(updatedAllergy.getOther_allergies());
        existingAllergy.setUncommon_allergies(updatedAllergy.getUncommon_allergies());

        // Save and return the updated allergy
        return allergyRepository.save(existingAllergy);
    }



    // READ
    public List<Allergy> getAllAllergies() {
        return allergyRepository.findAll();
    }

    public Allergy getAllergyById(Long id) {
        return allergyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allergy", "id", id));
    }

    // UPDATE
    public Allergy updateAllergy(Long id, Allergy updatedAllergy) {
        Allergy existingAllergy = allergyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allergy", "id", id));

        existingAllergy.setEmail(updatedAllergy.getEmail());

        return allergyRepository.save(existingAllergy);
    }
    public List<Allergy> getAllergiesByEmail(String email) {
        return allergyRepository.findAllByEmail(email);
    }
    // DELETE
    public void deleteAllergy(Long id) {
        Allergy allergy = allergyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allergy", "id", id));
        allergyRepository.delete(allergy);
    }

}
