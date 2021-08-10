package program.inventory.api.service;

import java.util.List;

import program.inventory.api.entity.RecipeProducts;

public interface IRecipeProductsService {

	List<RecipeProducts> buscarTodos();
	List<RecipeProducts> buscarFiltro(int idRecipe, int idProduct);
	RecipeProducts recuperar (int idRecipeProducts);
	void guardar(RecipeProducts recipeProducts);
	void eliminar(int idRecipeProducts);
	List<RecipeProducts> recuperarRecipeProductsRecipe(int idRecipe);
	List<RecipeProducts> recuperarRecipeProductsProduct(int idProduct);
}
