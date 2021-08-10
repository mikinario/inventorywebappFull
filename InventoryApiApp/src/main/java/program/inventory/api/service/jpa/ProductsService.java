package program.inventory.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.Product;
import program.inventory.api.repository.ProductsRepository;
import program.inventory.api.service.IProductsService;

@Service
public class ProductsService implements IProductsService {

	@Autowired
	private ProductsRepository repoProducts;
	
	public List<Product> buscarTodos() {
		return repoProducts.findAll();
	}

	public void guardar(Product product) {
		repoProducts.save(product);
	}
	
	public Product recuperar(int idProduct) {
		Optional<Product> optional = repoProducts.findById(idProduct);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idProduct) {
		repoProducts.deleteById(idProduct);
	}

}
