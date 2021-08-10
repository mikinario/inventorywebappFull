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

import program.inventory.api.entity.Recipe;
import program.inventory.api.service.IRecipesService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RecipesController {
	
	@Autowired
	private IRecipesService serviceRecipes;
	
	@GetMapping("/recipes")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<Recipe> buscarTodos(){
		return serviceRecipes.buscarTodos();
	}
	
	@GetMapping("/recipes/{id}") 
	public Recipe recuperar(@PathVariable("id") int idRecipe) {
		 Recipe recipe = serviceRecipes.recuperar(idRecipe);
		 return recipe;
		
	}
	
	@GetMapping("/recipes/name/{nameRecipe}") 
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public Recipe recuperarPorNombre(@PathVariable("nameRecipe") String nameRecipe) {
		 Recipe recipe = serviceRecipes.recuperarPorNombre(nameRecipe);
		 return recipe;
	}
	
	@PostMapping("/recipes") 
	public Recipe insertar(@RequestBody Recipe recipe) {
		serviceRecipes.guardar(recipe);
		return recipe;
	}
	
	@PutMapping("/recipes")
	public Recipe modificar(@RequestBody Recipe recipe) {
		serviceRecipes.guardar(recipe);// al pasarle el id, modificará el álbum correspondiente 
		return recipe;
	} 
	
	@DeleteMapping("/recipes/{id}")
	public String eliminar(@PathVariable("id") int idRecipe) {
		serviceRecipes.eliminar(idRecipe);
		return "Registro Eliminado";
	}
}
