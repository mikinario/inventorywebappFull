package program.inventory.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import program.inventory.api.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	
	Users findByUsername(String username);

	Users findById(long id);

	List<Users> findAll();
	
	Optional<Users> findById(int id);
	
	void deleteById(int id);
	
}

