package program.inventory.api.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import program.inventory.api.entity.Users;
import program.inventory.api.repository.UsersRepository;


@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UsersRepository repoUsuarios;

	@Autowired
	private PasswordEncoder bcryptEncoder;


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Users user = repoUsuarios.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(
				user.getUsername(), 
				user.getPassword(),
				new ArrayList<>());
	}
	
	

	public Users findByUsername(String username) {
		return repoUsuarios.findByUsername(username);
	}
	
	public Users save(Users user) {
		Users newUser = new Users();
		newUser.setId(user.getId());
		newUser.setName(user.getName());
		newUser.setSurnames(user.getSurnames());
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setRole(user.getRole());
		
		return repoUsuarios.save(newUser);
	}

}
