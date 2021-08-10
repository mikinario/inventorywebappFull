package program.inventory.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import program.inventory.api.entity.Restaurant;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Integer> {
	
	//List<Restaurant> findByNombre(String nombreRestaurante);

}
