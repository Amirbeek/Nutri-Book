package org.example.nutribookbe.service;
import jakarta.persistence.*;
import org.example.nutribookbe.entity.Recipe;
import org.example.nutribookbe.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }
}
