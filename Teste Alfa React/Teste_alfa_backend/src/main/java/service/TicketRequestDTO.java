package service;

public record TicketRequestDTO(
        Long id,
        String title,
        Long client_id,
        String open_date,
        String close_date,
        Long module_id
) {}
