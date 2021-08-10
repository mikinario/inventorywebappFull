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

import program.inventory.api.entity.Supplier;
import program.inventory.api.service.ISupplierService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SupplierController {
	
	@Autowired
	private ISupplierService serviceSupplier;
	
	@GetMapping("/suppliers")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<Supplier> buscarTodos(){
		return serviceSupplier.buscarTodos();
	}
	
	
	@GetMapping("/suppliers/{id}") 
	public Supplier recuperar(@PathVariable("id") int idSupplier) {
		 Supplier supplier = serviceSupplier.recuperar(idSupplier);
		 return supplier;
		
	}
	
	@PostMapping("/suppliers") 
	public Supplier insertar(@RequestBody Supplier supplier) {
		serviceSupplier.guardar(supplier);
		return supplier;
	}
	
	@PutMapping("/suppliers")
	public Supplier modificar(@RequestBody Supplier supplier) {
		serviceSupplier.guardar(supplier);// al pasarle el id, modificará el álbum correspondiente 
		return supplier;
	} 
	
	@DeleteMapping("/suppliers/{id}")
	public String eliminar(@PathVariable("id") int idSupplier) {
		serviceSupplier.eliminar(idSupplier);
		return "Registro Eliminado";
	}
}

