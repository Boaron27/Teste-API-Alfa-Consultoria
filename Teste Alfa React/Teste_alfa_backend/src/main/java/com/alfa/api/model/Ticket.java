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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private LocalDate opening_date;
    private LocalDate closing_date;
    private String fk_id_client;
    private String fk_id_module;

    public Ticket(TicketRequestDTO data, ClientRepository clientRepository, ModuleRepository moduleRepository) {
        this.id = data.id();
        this.title = data.title();
        this.fk_id_client = String.valueOf(data.fk_id_client());
        this.opening_date = LocalDate.parse(data.opening_date());
        this.closing_date = LocalDate.parse(data.closing_date());
        this.fk_id_module = String.valueOf(data.fk_id_module());
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

    public String getFk_id_client() {
        return fk_id_client;
    }

    public void setFk_id_client(String fk_id_client) {
        this.fk_id_client = fk_id_client;
    }

    public String getFk_id_module() {
        return fk_id_module;
    }

    public void setFk_id_module(String fk_id_module) {
        this.fk_id_module = fk_id_module;
    }
}
