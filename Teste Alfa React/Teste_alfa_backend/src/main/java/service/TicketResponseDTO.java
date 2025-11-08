package service;

import model.Cliente;
import model.Ticket;

public record TicketResponseDTO(
        long id,
        String title,
        String client_id,
        String open_date,
        String close_date,
        String module_id
) {
    public TicketResponseDTO(Ticket ticket) {
        this(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getClient_id(),
                ticket.getOpen_date().toString(),
                ticket.getClose_date().toString(),
                ticket.getModule_id()
        );
    }
}
