package program.inventory.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import program.inventory.api.entity.RecipeProducts;
import program.inventory.api.entity.Product;
import program.inventory.api.entity.Recipe;
import program.inventory.api.service.IRecipeProductsService;
import program.inventory.api.service.IProductsService;
import program.inventory.api.service.IRecipesService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RecipeProductsController {
	
	@Autowired
	private IRecipeProductsService serviceRecipeProducts;
	
	@Autowired
	private IRecipesService serviceRecipes;
	
	@Autowired
	private IProductsService serviceProducts;
	
	@GetMapping("/recipeProducts")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<RecipeProducts> buscarTodos(){
		return serviceRecipeProducts.buscarTodos();
	}
	
	@GetMapping("/recipeProducts/{id}")
	public RecipeProducts recuperar(@PathVariable("id") int idRecipeProducts) {
		RecipeProducts recipeProducts = serviceRecipeProducts.recuperar(idRecipeProducts);
		return recipeProducts;
	}
	@GetMapping("/recipeProducts/{idRecipe}/{idProduct}")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<RecipeProducts> buscarFiltro(
			@PathVariable("idRecipe") int idRecipe,
			@PathVariable("idProduct") int idProduct
			) {
		return serviceRecipeProducts.buscarFiltro(idRecipe, idProduct);
	}
	
	@GetMapping("/recipeProducts/recipes/{id}")
	public List<RecipeProducts>  recuperarListaRecipeProductsRecipe(@PathVariable("id") int idRecipe) {
		List<RecipeProducts> recipeProducts = serviceRecipeProducts.recuperarRecipeProductsRecipe(idRecipe);
		return recipeProducts;
	}
	
	@GetMapping("/recipeProducts/products/{id}")
	public List<RecipeProducts>  recuperarListaRecipeProductsProduct(@PathVariable("id") int idProduct) {
		List<RecipeProducts> recipeProducts = serviceRecipeProducts.recuperarRecipeProductsProduct(idProduct);
		return recipeProducts;
	}
	
	@PostMapping("/recipeProducts")
	public RecipeProducts insertar(@RequestBody RecipeProducts recipeProducts) {
		serviceRecipeProducts.guardar(recipeProducts);
		return recipeProducts;
	}
	
	@PostMapping("/recipeProducts/addRecipe/{idRecipe}")
	public RecipeProducts insertar(@RequestBody RecipeProducts recipeProducts, @PathVariable("idRecipe") int idRecipe) {
		Recipe recipe = serviceRecipes.recuperar(idRecipe); 
		recipeProducts.setRecipe(recipe);
		
		serviceRecipeProducts.guardar(recipeProducts);
		return recipeProducts;
	}
	
	@PostMapping("/recipeProducts/addProduct/{idProduct}")
	public RecipeProducts insertar1(@RequestBody RecipeProducts recipeProducts, @PathVariable("idProduct") int idProduct) {
		Product product = serviceProducts.recuperar(idProduct); 
		recipeProducts.setProduct(product);
		
		serviceRecipeProducts.guardar(recipeProducts);
		return recipeProducts;
	}
	
	@PutMapping("/recipeProducts")
	public RecipeProducts modificar(@RequestBody RecipeProducts recipeProducts) {
		serviceRecipeProducts.guardar(recipeProducts);// al pasarle el id, modificará la opininión correspondiente
		return recipeProducts;
	}
	
	@DeleteMapping("/recipeProducts/{id}")
	public String eliminar(@PathVariable("id") int idRecipeProducts) {
		serviceRecipeProducts.eliminar(idRecipeProducts);
		return "RecipeProducts Eliminado";	
	}
}
	
	