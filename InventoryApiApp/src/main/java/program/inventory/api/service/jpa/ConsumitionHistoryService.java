package program.inventory.api.service.jpa;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.ConsumitionHistory;
import program.inventory.api.entity.Restaurant;
import program.inventory.api.repository.ConsumitionHistoryRepository;
import program.inventory.api.service.IConsumitionHistoryService;

@Service
public class ConsumitionHistoryService implements IConsumitionHistoryService {

	@Autowired
	private ConsumitionHistoryRepository repoConsumitionHistory;
	
	public List<ConsumitionHistory> buscarTodos() {
		return repoConsumitionHistory.findAll();
	}

	public void guardar(ConsumitionHistory consumitionHistory) {
		repoConsumitionHistory.save(consumitionHistory);
	}
	
	public ConsumitionHistory recuperar(int idConsumitionHistory) {
		Optional<ConsumitionHistory> optional = repoConsumitionHistory.findById(idConsumitionHistory);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
	public List<ConsumitionHistory> recuperarPorRestaurant(int idRestaurant){
		Restaurant res = new Restaurant();
		res.setId(idRestaurant);
		return repoConsumitionHistory.findByRestaurant(res);
	}

	public void eliminar(int idConsumitionHistory) {
		repoConsumitionHistory.deleteById(idConsumitionHistory);
	}

	@Override
	public List<ConsumitionHistory> recuperarPorFecha(Date date) {
		return repoConsumitionHistory.findByDate(date);
	}
}

