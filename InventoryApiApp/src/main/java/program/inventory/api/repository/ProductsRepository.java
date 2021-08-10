package program.inventory.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import program.inventory.api.entity.Product;

public interface ProductsRepository extends JpaRepository<Product, Integer> {

}
