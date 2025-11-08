package com.alfa.api.service;

import com.alfa.api.model.Ticket;

public record TicketResponseDTO(
        long id,
        String title,
        String fk_id_client,
        String opening_date,
        String closing_date,
        String fk_id_module
) {
    public TicketResponseDTO(Ticket ticket) {
        this(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getFk_id_client(),
                ticket.getOpening_date().toString(),
                ticket.getClosing_date().toString(),
                ticket.getFk_id_module()
        );
    }
}
