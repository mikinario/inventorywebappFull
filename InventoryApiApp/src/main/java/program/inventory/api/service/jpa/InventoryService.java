package program.inventory.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.Inventory;
import program.inventory.api.entity.Product;
import program.inventory.api.entity.Restaurant;
import program.inventory.api.repository.InventoryRepository;
import program.inventory.api.service.IInventoryService;

@Service
public class InventoryService implements IInventoryService {
	
	@Autowired
	private InventoryRepository repoInventory;
	
	public List<Inventory> buscarTodos() {
		return repoInventory.findAll();	
	}
	public List<Inventory> buscarFiltro(int idRestaurant, int idProduct) {
		if(idRestaurant>0 && idProduct>0) {
			
			Restaurant res = new Restaurant();
			res.setId(idRestaurant);
			Product prd = new Product();
			prd.setId(idProduct);
			
			return repoInventory.findByRestaurantAndProduct( res, prd);
		}
		return null;
	}
	
	public void guardar(Inventory inventory) {
		repoInventory.save(inventory);
	}

	public Inventory recuperar(int idInventory) {
		Optional<Inventory> optional = repoInventory.findById(idInventory);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
	public List<Inventory> recuperarInventoryRestaurant(int idRestaurant){
		Restaurant res = new Restaurant();
		res.setId(idRestaurant);
		return repoInventory.findByRestaurant(res);
	}
	
	public List<Inventory> recuperarInventoryProduct(int idProduct){
		return repoInventory.findByProduct(new Product());
	}
	
	
	public void eliminar(int idInventory) {
		repoInventory.deleteById(idInventory);
	}
	
}