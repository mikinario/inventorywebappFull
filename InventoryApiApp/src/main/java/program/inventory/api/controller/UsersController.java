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

import program.inventory.api.entity.Users;
import program.inventory.api.service.IUsersService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsersController {
	
	@Autowired
	private IUsersService serviceUsers;
	
	@GetMapping("/users")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public List<Users> buscarTodos(){
		return serviceUsers.buscarTodos();
	}
	
	
	@GetMapping("/users/{id}") 
	public Users recuperar(@PathVariable("id") int idUser) {
		 Users user = serviceUsers.recuperar(idUser);
		 return user;
		
	}
	
	@PostMapping("/users") 
	public Users insertar(@RequestBody Users user) {
		serviceUsers.guardar(user);
		return user;
	}
	
	@PutMapping("/users")
	public Users modificar(@RequestBody Users user) {
		serviceUsers.guardar(user);// al pasarle el id, modificará el álbum correspondiente 
		return user;
	} 
	
	@DeleteMapping("/users/{id}")
	public String eliminar(@PathVariable("id") int idUser) {
		serviceUsers.eliminar(idUser);
		return "Registro Eliminado";
	}
}
