package com.alfa.api.controller;

import com.alfa.api.repository.ClientRepository;
import com.alfa.api.service.ClientResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    
    @GetMapping
    public List<ClientResponseDTO> getAll() {
        return clientRepository.findAll()
                .stream()
                .map(ClientResponseDTO::new)
                .toList();
    }
}
