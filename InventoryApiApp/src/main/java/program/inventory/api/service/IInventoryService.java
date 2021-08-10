package program.inventory.api.service;

import java.util.List;

import program.inventory.api.entity.Inventory;

public interface IInventoryService {

	List<Inventory> buscarTodos();
	List<Inventory> buscarFiltro(int idRestaurant, int idProduct);
	Inventory recuperar (int idInventory);
	void guardar(Inventory inventory);
	void eliminar(int idInventory);
	List<Inventory> recuperarInventoryRestaurant(int idRestaurant);
	List<Inventory> recuperarInventoryProduct(int idProduct);
}

