package program.inventory.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/web")
public class ProductsAppController {
	
	@GetMapping("/login")
	public String mostrarListaView(){
		return "index";
	}
}
