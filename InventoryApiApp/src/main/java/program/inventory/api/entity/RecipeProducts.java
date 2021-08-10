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
@Table(name="recipe_products")
public class RecipeProducts {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "rxp_id") 
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "rxp_recipe_id") 
	private Recipe recipe;
	
	@ManyToOne
	@JoinColumn(name = "rxp_product_id") 
	private Product product;
	
	@Column(name = "rxp_product_cantidad") 
	private Double productCantidad;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Double getProductCantidad() {
		return productCantidad;
	}

	public void setProductCantidad(Double productCantidad) {
		this.productCantidad = productCantidad;
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
		RecipeProducts other = (RecipeProducts) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "RecipeProducts [id=" + id + ", recipe=" + recipe + ", product=" + product + ", productCantidad="
				+ productCantidad + "]";
	}
	
	
}
