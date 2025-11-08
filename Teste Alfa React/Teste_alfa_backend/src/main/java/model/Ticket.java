package model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import service.TicketRequestDTO;


import java.time.LocalDate;

@Table(name = "Tickets")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity
public class Ticket {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private LocalDate open_date;
    private LocalDate close_date;
    private String client_id;
    private String module_id;

    public Ticket(TicketRequestDTO data) {
        this.id = data.id();
        this.title = data.title();
        this.client_id = String.valueOf(data.client_id());
        this.open_date = LocalDate.parse(data.open_date());
        this.close_date = LocalDate.parse(data.close_date());
        this.module_id = String.valueOf(data.module_id());
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

    public LocalDate getOpen_date() {
        return open_date;
    }

    public void setOpen_date(LocalDate open_date) {
        this.open_date = open_date;
    }

    public LocalDate getClose_date() {
        return close_date;
    }

    public void setClose_date(LocalDate close_date) {
        this.close_date = close_date;
    }

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    public String getModule_id() {
        return module_id;
    }

    public void setModule_id(String module_id) {
        this.module_id = module_id;
    }
}
