package controller;

import model.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.TicketRepository;
import service.TicketRequestDTO;
import service.TicketResponseDTO;

import java.util.List;

@RestController
@RequestMapping("ticket")
public class TicketController {

    @Autowired
    private TicketRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveFood(@RequestBody TicketRequestDTO data){
        Ticket ticketData = new Ticket(data);
        repository.save(ticketData);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<TicketResponseDTO> getAll(){

        List<TicketResponseDTO> ticketlist = repository.findAll().stream().map(TicketResponseDTO::new).toList();
        return ticketlist;
    }
}