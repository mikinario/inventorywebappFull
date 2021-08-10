package program.inventory.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class InventoryApplication extends SpringBootServletInitializer{

	 @Override
	    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	        return application.sources(InventoryApplication.class);
	    }
	
	public static void main(String[] args) {
		SpringApplication.run(InventoryApplication.class, args);
	}
	// Configuración de CORS global (podría configurarse localmente en cada controlador)
		@Bean
		public WebMvcConfigurer corsConfigurer() {
			return new WebMvcConfigurer() {
				@Override
				public void addCorsMappings(CorsRegistry registry) {
					// Si habilitamos cors añadir las rutas accesibles
					registry.addMapping("/api/restaurants").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/restaurants/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/restaurants/*/*/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/products").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/products/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/products/*/*/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/inventory").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/inventory/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/inventory/*/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/recipes").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/recipes/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/recipes/name/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/recipeProducts").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/recipeProducts/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/recipeProducts/*/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/recipeProducts/recipes/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/recipeProducts/products/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/inventory/restaurants/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/consumitionHistory").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/consumitionHistory/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/consumitionHistory/date/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/consumitionHistory/restaurats/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/suppliers").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/suppliers/*").allowedOrigins("*:5501","*:80","*:443");
					
					registry.addMapping("/api/register").allowedOrigins("*:5501","*:80","*:443");
					
					// Cors usuarios
					registry.addMapping("/api/users/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/users/username/*").allowedOrigins("*:5501","*:80","*:443");
					registry.addMapping("/api/login")
	                        .allowedOrigins("*:5501","*:80","*:443")
	                        .allowedMethods("POST")
	                        .maxAge(3600);
				
					// Opiniones de restaurantes
					/*
					registry.addMapping("/api/inventory")
	                .allowedOrigins("http://127.0.0.1:5501", "http://localhost:5501")
	                .allowedMethods("GET", "POST")
	                .maxAge(3600);
					*/
					registry.addMapping("/api/inventory/add/*").allowedOrigins("*:5501","*:80","*:443");
				}
			};
}
}
