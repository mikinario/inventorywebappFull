package program.inventory.api.service;

import java.sql.Date;
import java.util.List;

import program.inventory.api.entity.ConsumitionHistory;

public interface IConsumitionHistoryService {
	
	List<ConsumitionHistory> buscarTodos();
	ConsumitionHistory recuperar (int idConsumitionHistory);
	List<ConsumitionHistory> recuperarPorFecha (Date date);
	List<ConsumitionHistory> recuperarPorRestaurant(int idRestaurant);
	void guardar(ConsumitionHistory consumitionHistory);
	void eliminar(int idConsumitionHistory);
}
