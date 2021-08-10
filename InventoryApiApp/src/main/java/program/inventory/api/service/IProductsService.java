package program.inventory.api.service;

import java.util.List;

import program.inventory.api.entity.Product;

public interface IProductsService {

	List<Product> buscarTodos();
	Product recuperar (int idProduct);
	void guardar(Product product);
	void eliminar(int idProduct);
}
