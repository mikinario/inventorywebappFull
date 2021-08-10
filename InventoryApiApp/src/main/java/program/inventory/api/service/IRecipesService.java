package program.inventory.api.service;

import java.util.List;

import program.inventory.api.entity.Recipe;

public interface IRecipesService {
	
	List<Recipe> buscarTodos();
	Recipe recuperar (int idRecipe);
	Recipe recuperarPorNombre (String nameRecipe);
	void guardar(Recipe recipe);
	void eliminar(int idRecipe);
}
