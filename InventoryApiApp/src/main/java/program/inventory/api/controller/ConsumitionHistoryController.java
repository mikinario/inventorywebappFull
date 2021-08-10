package program.inventory.api.controller;

import java.sql.Date;
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


import program.inventory.api.entity.ConsumitionHistory;
import program.inventory.api.entity.Recipe;
import program.inventory.api.entity.Restaurant;
import program.inventory.api.service.IConsumitionHistoryService;
import program.inventory.api.service.IRecipesService;
import program.inventory.api.service.IRestaurantsService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ConsumitionHistoryController {
	
	@Autowired
	private IConsumitionHistoryService serviceConsumitionHistory;
	
	@Autowired
	private IRestaurantsService serviceRestaurants;
	
	@Autowired
	private IRecipesService serviceRecipes;
	
	
	@GetMapping("/consumitionHistory")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<ConsumitionHistory> buscarTodos(){
		return serviceConsumitionHistory.buscarTodos();
	}
	
	@GetMapping("/consumitionHistory/{id}")
	public ConsumitionHistory recuperar(@PathVariable("id") int idConsumitionHistory) {
		ConsumitionHistory consumitionHistory = serviceConsumitionHistory.recuperar(idConsumitionHistory);
		return consumitionHistory;
	}
	
	@GetMapping("/consumitionHistory/date/{date}") 
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<ConsumitionHistory> recuperarPorFecha(@PathVariable("date") Date date) {
		List<ConsumitionHistory> consumitionDate = serviceConsumitionHistory.recuperarPorFecha(date);
		 return consumitionDate;
	}
	
	@GetMapping("/consumitionHistory/restaurats/{id}") 
	public List<ConsumitionHistory>  recuperarListaInventoryRestaurant(@PathVariable("id") int idRestaurant) {
		List<ConsumitionHistory> consumitionHistory = serviceConsumitionHistory.recuperarPorRestaurant(idRestaurant);
		return consumitionHistory;
	}
	
	@PostMapping("/consumitionHistory")
	public ConsumitionHistory insertar(@RequestBody ConsumitionHistory consumitionHistory) {
		serviceConsumitionHistory.guardar(consumitionHistory);
		return consumitionHistory;
	}
	
	@PostMapping("/consumitionHistory/addRestaurant/{idRestaurant}")
	public ConsumitionHistory insertar(@RequestBody ConsumitionHistory consumitionHistory, @PathVariable("idRestaurant") int idRestaurant) {
		Restaurant restaurant = serviceRestaurants.recuperar(idRestaurant); 
		consumitionHistory.setRestaurant(restaurant);
		
		serviceConsumitionHistory.guardar(consumitionHistory);
		return consumitionHistory;
	}
	
	@PostMapping("/consumitionHistory/addRecipe/{idRecipe}")
	public ConsumitionHistory insertar1(@RequestBody ConsumitionHistory consumitionHistory, @PathVariable("idRecipe") int idRecipe) {
		Recipe recipe = serviceRecipes.recuperar(idRecipe); 
		consumitionHistory.setRecipe(recipe);
		
		serviceConsumitionHistory.guardar(consumitionHistory);
		return consumitionHistory;
	}
	
	@PutMapping("/consumitionHistory")
	public ConsumitionHistory modificar(@RequestBody ConsumitionHistory consumitionHistory) {
		serviceConsumitionHistory.guardar(consumitionHistory);// al pasarle el id, modificará la opininión correspondiente
		return consumitionHistory;
	}
	
	@DeleteMapping("/consumitionHistory/{id}")
	public String eliminar(@PathVariable("id") int idConsumitionHistory) {
		serviceConsumitionHistory.eliminar(idConsumitionHistory);
		return "ConsumitionHistory Eliminado";	
	}
}
	
	