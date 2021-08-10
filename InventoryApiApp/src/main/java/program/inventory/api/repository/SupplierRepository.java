package program.inventory.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import program.inventory.api.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

}
