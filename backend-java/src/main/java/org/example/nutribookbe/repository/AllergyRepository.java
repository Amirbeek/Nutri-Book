package org.example.nutribookbe.repository;

import org.example.nutribookbe.entity.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AllergyRepository extends JpaRepository<Allergy, Long> {
//    Allergy findByName(String name);
    Allergy findByEmail(String email);
    List<Allergy> findAllByEmail(String email);

}
