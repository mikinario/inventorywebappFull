package program.inventory.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.Recipe;
import program.inventory.api.repository.RecipesRepository;
import program.inventory.api.service.IRecipesService;

@Service
public class RecipesService implements IRecipesService {

	@Autowired
	private RecipesRepository repoRecipes;
	
	public List<Recipe> buscarTodos() {
		return repoRecipes.findAll();
	}

	public void guardar(Recipe recipe) {
		repoRecipes.save(recipe);
	}
	
	public Recipe recuperar(int idRecipe) {
		Optional<Recipe> optional = repoRecipes.findById(idRecipe);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idRecipe) {
		repoRecipes.deleteById(idRecipe);
	}

	@Override
	public Recipe recuperarPorNombre(String nameRecipe) {
		return repoRecipes.findByName(nameRecipe);
	}

}

