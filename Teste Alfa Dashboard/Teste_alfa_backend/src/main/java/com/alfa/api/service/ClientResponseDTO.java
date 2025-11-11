package com.alfa.api.service;

import com.alfa.api.model.Client;


public record ClientResponseDTO(
        long id,
        String name
) {
    public ClientResponseDTO(Client client) {
        this(
                client.getId(),
                client.getName()
        );
    }
}
