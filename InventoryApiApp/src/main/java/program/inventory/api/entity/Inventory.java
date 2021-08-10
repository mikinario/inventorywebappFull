package program.inventory.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="inventory")
public class Inventory {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "inv_id") 
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "inv_restaurant_id") 
	private Restaurant restaurant;
	
	@ManyToOne
	@JoinColumn(name = "inv_product_id") 
	private Product product;
	
	@Column(name = "inv_cantidad") 
	private Double cantidad;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Double getCantidad() {
		return cantidad;
	}

	public void setCantidad(Double cantidad) {
		this.cantidad = cantidad;
	}

	@Override
	public String toString() {
		return "Inventory [id=" + id + ", restaurant=" + restaurant + ", product=" + product + ", cantidad=" + cantidad
				+ "]";
	}

	
	
	
	
	
}
