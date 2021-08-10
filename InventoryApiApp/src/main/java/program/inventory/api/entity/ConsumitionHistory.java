package program.inventory.api.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="consumition_history")
public class ConsumitionHistory {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "ch_id") 
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "ch_restaurant_id") 
	private Restaurant restaurant;
	
	@ManyToOne
	@JoinColumn(name = "ch_recipe_id") 
	private Recipe recipe;
	
	@Column(name = "ch_date") 
	private Date date;
	
	@Column(name = "ch_cantidad") 
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

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Double getCantidad() {
		return cantidad;
	}

	public void setCantidad(Double cantidad) {
		this.cantidad = cantidad;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ConsumitionHistory other = (ConsumitionHistory) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ConsumitionHistory [id=" + id + ", restaurant=" + restaurant + ", recipe=" + recipe + ", date=" + date
				+ ", cantidad=" + cantidad + "]";
	}
	
	
}
