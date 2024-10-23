package org.example.nutribookbe.repository;


import org.example.nutribookbe.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
