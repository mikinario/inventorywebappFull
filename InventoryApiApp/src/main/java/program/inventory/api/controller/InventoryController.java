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


import program.inventory.api.entity.Inventory;
import program.inventory.api.entity.Product;
import program.inventory.api.entity.Restaurant;
import program.inventory.api.service.IInventoryService;
import program.inventory.api.service.IProductsService;
import program.inventory.api.service.IRestaurantsService;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InventoryController {
	
	@Autowired
	private IInventoryService serviceInventory;
	
	@Autowired
	private IRestaurantsService serviceRestaurants;
	
	@Autowired
	private IProductsService serviceProducts;
	
	@GetMapping("/inventory")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<Inventory> buscarTodos(){
		return serviceInventory.buscarTodos();
	}
	
	@GetMapping("/inventory/{id}")
	public Inventory recuperar(@PathVariable("id") int idInventory) {
		Inventory inventory = serviceInventory.recuperar(idInventory);
		return inventory;
	}
	@GetMapping("/inventory/{idRestaurant}/{idProduct}")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<Inventory> buscarFiltro(
			@PathVariable("idRestaurant") int idRestaurant,
			@PathVariable("idProduct") int idProduct
			) {
		return serviceInventory.buscarFiltro(idRestaurant, idProduct);
	}
	
	@GetMapping("/inventory/restaurats/{id}") 
	public List<Inventory>  recuperarListaInventoryRestaurant(@PathVariable("id") int idRestaurant) {
		List<Inventory> inventoryRestaurant = serviceInventory.recuperarInventoryRestaurant(idRestaurant);
		return inventoryRestaurant;
	}
	
	
	@GetMapping("/inventory/products/{id}")
	public List<Inventory>  recuperarListaInventoryProduct(@PathVariable("id") int idProduct) {
		List<Inventory> inventory = serviceInventory.recuperarInventoryProduct(idProduct);
		return inventory;
	}
	
	@PostMapping("/inventory")
	public Inventory insertar(@RequestBody Inventory inventory) {
		serviceInventory.guardar(inventory);
		return inventory;
	}
	
	@PostMapping("/inventory/addRestaurant/{idRestaurant}")
	public Inventory insertar(@RequestBody Inventory inventory, @PathVariable("idRestaurant") int idRestaurant) {
		Restaurant restaurant = serviceRestaurants.recuperar(idRestaurant); 
		inventory.setRestaurant(restaurant);
		
		serviceInventory.guardar(inventory);
		return inventory;
	}
	
	@PostMapping("/inventory/addProduct/{idProduct}")
	public Inventory insertar1(@RequestBody Inventory inventory, @PathVariable("idProduct") int idProduct) {
		Product product = serviceProducts.recuperar(idProduct); 
		inventory.setProduct(product);
		
		serviceInventory.guardar(inventory);
		return inventory;
	}
	
	@PutMapping("/inventory")
	public Inventory modificar(@RequestBody Inventory inventory) {
		serviceInventory.guardar(inventory);// al pasarle el id, modificará la opininión correspondiente
		return inventory;
	}
	
	@DeleteMapping("/inventory/{id}")
	public String eliminar(@PathVariable("id") int idInventory) {
		serviceInventory.eliminar(idInventory);
		return "Inventory Eliminado";	
	}
}
	
	