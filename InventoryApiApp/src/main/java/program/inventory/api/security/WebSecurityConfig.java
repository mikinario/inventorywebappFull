package program.inventory.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private UserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// configure AuthenticationManager so that it knows from where to load
		// user for matching credentials
		// Use BCryptPasswordEncoder
		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity
				// Disabled cors for default
				.cors().and() 
				
				// We don't need CSRF for this example
				.csrf().disable()
				
				
				
				
				// No hace falta estar autorizado
				.authorizeRequests()
				//.antMatchers("/**").permitAll()
				.antMatchers("/api/login").permitAll()
				
				// El resto de peticiones is necesitan Autorización
				.anyRequest().authenticated().and()
				
				// Make sure we use stateless session; session won't be used to store user's state.
				.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and().formLogin()
			      .loginPage("/login.html")
			      .loginProcessingUrl("/perform_login")
			      .defaultSuccessUrl("/homepage.html",true)
			      .failureUrl("/login.html?error=true");

		// Add a filter to validate the tokens with every request
		httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
		
		
		
	}
}


/*
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.cors().and()
				.csrf().disable()
				.authorizeRequests().antMatchers(HttpMethod.POST, "/login").permitAll()
									.antMatchers(HttpMethod.POST, "/api/users/login").permitAll()
									.antMatchers(HttpMethod.GET, "/api/users/**").permitAll()
									.antMatchers(HttpMethod.GET, "/","/api/restaurantes", "/api/restaurantes/**", "/api/categorias","/api/localidades").permitAll()
									.antMatchers(HttpMethod.POST,"/api/restaurantes").hasAnyAuthority("ADMINISTRADOR")
									.antMatchers(HttpMethod.DELETE,"/api/restaurantes").hasAnyAuthority("ADMINISTRADOR")
									.antMatchers(HttpMethod.POST,"/api/categorias").hasAnyAuthority("ADMINISTRADOR")
									.antMatchers(HttpMethod.DELETE,"/api/categorias").hasAnyAuthority("ADMINISTRADOR")
									.antMatchers(HttpMethod.POST,"/api/localidades").hasAnyAuthority("ADMINISTRADOR")
									.antMatchers(HttpMethod.DELETE,"/api/localidades").hasAnyAuthority("ADMINISTRADOR")
				.anyRequest().authenticated().and()
				.addFilterBefore(new JwtAuthenticationFilter(authenticationManager()),
						UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtAuthorizationFilterBean(), UsernamePasswordAuthenticationFilter.class);
	}*/

