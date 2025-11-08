package repository;


import model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClientRepository extends JpaRepository<Cliente, Long> {

}
