package program.inventory.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.Restaurant;
import program.inventory.api.repository.RestaurantsRepository;
import program.inventory.api.service.IRestaurantsService;

@Service
public class RestaurantsService implements IRestaurantsService {

	@Autowired
	private RestaurantsRepository repoRestaurants;
	
	public List<Restaurant> buscarTodos() {
		return repoRestaurants.findAll();
	}

	public void guardar(Restaurant restaurant) {
		repoRestaurants.save(restaurant);
	}
	
	public Restaurant recuperar(int idRestaurant) {
		Optional<Restaurant> optional = repoRestaurants.findById(idRestaurant);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idRestaurant) {
		repoRestaurants.deleteById(idRestaurant);
	}

}
