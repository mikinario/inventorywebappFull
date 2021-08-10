package program.inventory.api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import program.inventory.api.entity.ConsumitionHistory;
import program.inventory.api.entity.Restaurant;

public interface ConsumitionHistoryRepository extends JpaRepository<ConsumitionHistory, Integer> {
	List<ConsumitionHistory> findByDate(Date date);
	List<ConsumitionHistory> findByRestaurant(Restaurant restaurant);
}

