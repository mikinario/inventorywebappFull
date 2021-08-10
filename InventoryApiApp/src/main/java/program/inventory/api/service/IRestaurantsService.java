package program.inventory.api.service;

import java.util.List;

import program.inventory.api.entity.Restaurant;

public interface IRestaurantsService {

	List<Restaurant> buscarTodos();
	Restaurant recuperar (int idRestaurant);
	void guardar(Restaurant restaurant);
	void eliminar(int idRestaurant);
}
