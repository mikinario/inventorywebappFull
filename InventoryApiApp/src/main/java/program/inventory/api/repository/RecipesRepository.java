package program.inventory.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import program.inventory.api.entity.Recipe;

public interface RecipesRepository extends JpaRepository<Recipe, Integer> {
	Recipe findByName(String nameRecipe);
}

