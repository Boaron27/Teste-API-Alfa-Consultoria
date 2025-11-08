package com.alfa.api.service;

public record TicketRequestDTO(
        Long id,
        String title,
        Long fk_id_client,
        String opening_date,
        String closing_date,
        Long fk_id_module
) {}
