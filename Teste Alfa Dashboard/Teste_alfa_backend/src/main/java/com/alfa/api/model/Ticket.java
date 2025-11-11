package com.alfa.api.model;

import com.alfa.api.repository.ClientRepository;
import com.alfa.api.repository.ModuleRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.alfa.api.service.TicketRequestDTO;


import java.time.LocalDate;

@Table(name = "ticket")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private LocalDate opening_date;
    private LocalDate closing_date;
    @ManyToOne
    @JoinColumn(name = "fk_id_client")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "fk_id_module")
    private Module module;

    public Ticket(TicketRequestDTO data, ClientRepository clientRepository, ModuleRepository moduleRepository) {
        this.title = data.title();
        this.opening_date = LocalDate.parse(data.opening_date());
        this.closing_date = LocalDate.parse(data.closing_date());
        this.client = clientRepository.findById(data.fk_id_client())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado: " + data.fk_id_client()));
        this.module = moduleRepository.findById(data.fk_id_module())
                .orElseThrow(() -> new RuntimeException("Módulo não encontrado: " + data.fk_id_module()));

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getOpening_date() {
        return opening_date;
    }

    public void setOpening_date(LocalDate opening_date) {
        this.opening_date = opening_date;
    }

    public LocalDate getClosing_date() {
        return closing_date;
    }

    public void setClosing_date(LocalDate closing_date) {
        this.closing_date = closing_date;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }
}
