package com.alfa.api.controller;

import com.alfa.api.model.Ticket;
import com.alfa.api.repository.ClientRepository;
import com.alfa.api.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.alfa.api.repository.TicketRepository;
import com.alfa.api.service.TicketRequestDTO;
import com.alfa.api.service.TicketResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/ticket")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    // ✅ INSERT
    @PostMapping
    public TicketResponseDTO insert(@RequestBody TicketRequestDTO data) {
        Ticket ticket = new Ticket(data, clientRepository, moduleRepository);
        Ticket saved = ticketRepository.save(ticket);
        return new TicketResponseDTO(saved);
    }

    // ✅ GET ALL
    @GetMapping
    public List<TicketResponseDTO> getAll() {
        return ticketRepository.findAll()
                .stream()
                .map(TicketResponseDTO::new)
                .toList();
    }
}
