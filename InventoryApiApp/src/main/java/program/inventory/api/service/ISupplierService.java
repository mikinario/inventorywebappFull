package program.inventory.api.service;

import java.util.List;

import program.inventory.api.entity.Supplier;

public interface ISupplierService {

	List<Supplier> buscarTodos();
	Supplier recuperar (int idSupplier);
	void guardar(Supplier supplier);
	void eliminar(int idSupplier);
}