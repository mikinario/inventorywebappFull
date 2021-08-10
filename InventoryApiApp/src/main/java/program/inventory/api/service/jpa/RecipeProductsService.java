package program.inventory.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.RecipeProducts;
import program.inventory.api.entity.Product;
import program.inventory.api.entity.Recipe;
import program.inventory.api.repository.RecipeProductsRepository;
import program.inventory.api.service.IRecipeProductsService;

@Service
public class RecipeProductsService implements IRecipeProductsService {
	
	@Autowired
	private RecipeProductsRepository repoRecipeProducts;
	
	public List<RecipeProducts> buscarTodos() {
		return repoRecipeProducts.findAll();	
	}
	public List<RecipeProducts> buscarFiltro(int idRecipe, int idProduct) {
		if(idRecipe>0 && idProduct>0) {
			
			Recipe rec = new Recipe();
			rec.setId(idRecipe);
			Product prd = new Product();
			prd.setId(idProduct);
			
			return repoRecipeProducts.findByRecipeAndProduct( rec, prd);
		}
		return null;
	}
	
	public void guardar(RecipeProducts recipeProduct) {
		repoRecipeProducts.save(recipeProduct);
	}

	public RecipeProducts recuperar(int idRecipeProducts) {
		Optional<RecipeProducts> optional = repoRecipeProducts.findById(idRecipeProducts);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
	public List<RecipeProducts> recuperarRecipeProductsRecipe(int idRecipe){
		Recipe rec = new Recipe();
		rec.setId(idRecipe);
		return repoRecipeProducts.findByRecipe(rec);
	}
	public List<RecipeProducts> recuperarRecipeProductsProduct(int idProduct){
		
		return repoRecipeProducts.findByProduct(new Product());
	}
	
	
	public void eliminar(int idRecipeProducts) {
		repoRecipeProducts.deleteById(idRecipeProducts);
	}
	
}