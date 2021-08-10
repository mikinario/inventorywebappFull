package program.inventory.api.service;

import java.util.List;

import program.inventory.api.entity.Users;

public interface IUsersService {

	List<Users> buscarTodos();
	Users recuperar (int idUser);
	void guardar(Users user);
	void eliminar(int idUser);
}
