package com.alfa.api.repository;


import com.alfa.api.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClientRepository extends JpaRepository<Cliente, Long> {

}
