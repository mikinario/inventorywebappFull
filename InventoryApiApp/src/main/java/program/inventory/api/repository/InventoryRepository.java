package program.inventory.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import program.inventory.api.entity.Inventory;
import program.inventory.api.entity.Product;
import program.inventory.api.entity.Restaurant;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

	List<Inventory> findByRestaurant(Restaurant restaurant);
	List<Inventory> findByProduct(Product product);
	List<Inventory> findByRestaurantAndProduct(Restaurant restaurant, Product product);
}
