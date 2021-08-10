package program.inventory.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.Supplier;
import program.inventory.api.repository.SupplierRepository;
import program.inventory.api.service.ISupplierService;

@Service
public class SupplierService implements ISupplierService {

	@Autowired
	private SupplierRepository repoSuppliers;
	
	public List<Supplier> buscarTodos() {
		return repoSuppliers.findAll();
	}

	public void guardar(Supplier supplier) {
		repoSuppliers.save(supplier);
	}
	
	public Supplier recuperar(int idSupplier) {
		Optional<Supplier> optional = repoSuppliers.findById(idSupplier);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idSupplier) {
		repoSuppliers.deleteById(idSupplier);
	}

}

