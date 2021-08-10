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

import program.inventory.api.entity.Product;
import program.inventory.api.service.IProductsService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductsController {
	
	@Autowired
	private IProductsService serviceProducts;
	
	@GetMapping("/products")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<Product> buscarTodos(){
		return serviceProducts.buscarTodos();
	}
	
	
	@GetMapping("/products/{id}") 
	public Product recuperar(@PathVariable("id") int idProduct) {
		 Product product = serviceProducts.recuperar(idProduct);
		 return product;
		
	}
	
	@PostMapping("/products") 
	public Product insertar(@RequestBody Product product) {
		serviceProducts.guardar(product);
		return product;
	}
	
	@PutMapping("/products")
	public Product modificar(@RequestBody Product product) {
		serviceProducts.guardar(product);// al pasarle el id, modificará el álbum correspondiente 
		return product;
	} 
	
	@DeleteMapping("/products/{id}")
	public String eliminar(@PathVariable("id") int idProduct) {
		serviceProducts.eliminar(idProduct);
		return "Registro Eliminado";
	}
}
