package program.inventory.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import program.inventory.api.entity.Product;
import program.inventory.api.entity.Recipe;
import program.inventory.api.entity.RecipeProducts;

public interface RecipeProductsRepository extends JpaRepository<RecipeProducts, Integer> {

	List<RecipeProducts> findByRecipe(Recipe recipe);
	List<RecipeProducts> findByProduct(Product product);
	List<RecipeProducts> findByRecipeAndProduct(Recipe recipe, Product product);
}
