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

import program.inventory.api.entity.Restaurant;
import program.inventory.api.service.IRestaurantsService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RestaurantsController {
	
	@Autowired
	private IRestaurantsService serviceRestaurants;
	
	@GetMapping("/restaurants")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<Restaurant> buscarTodos(){
		return serviceRestaurants.buscarTodos();
	}
	
	
	@GetMapping("/restaurants/{id}") 
	public Restaurant recuperar(@PathVariable("id") int idRestaurant) {
		 Restaurant restaurant = serviceRestaurants.recuperar(idRestaurant);
		 return restaurant;
		
	}
	
	@PostMapping("/restaurants") 
	public Restaurant insertar(@RequestBody Restaurant restaurant) {
		serviceRestaurants.guardar(restaurant);
		return restaurant;
	}
	
	@PutMapping("/restaurants")
	public Restaurant modificar(@RequestBody Restaurant restaurant) {
		serviceRestaurants.guardar(restaurant);// al pasarle el id, modificará el álbum correspondiente 
		return restaurant;
	} 
	
	@DeleteMapping("/restaurants/{id}")
	public String eliminar(@PathVariable("id") int idRestaurant) {
		serviceRestaurants.eliminar(idRestaurant);
		return "Registro Eliminado";
	}
}
