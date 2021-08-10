package program.inventory.api.service.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.Users;
import program.inventory.api.repository.UsersRepository;
import program.inventory.api.service.IUsersService;

@Service
public class UsersService implements IUsersService {

	@Autowired
	private UsersRepository repoUsers;
	
	public List<Users> buscarTodos() {
		return repoUsers.findAll();
	}

	public void guardar(Users users) {
		repoUsers.save(users);
	}
	
	public Users recuperar(int idUser) {
		Optional<Users> optional = repoUsers.findById(idUser);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void eliminar(int idUser) {
		repoUsers.deleteById(idUser);
	}

}
