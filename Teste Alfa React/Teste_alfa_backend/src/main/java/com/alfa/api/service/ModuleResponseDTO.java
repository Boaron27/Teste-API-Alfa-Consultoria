package com.alfa.api.service;

import com.alfa.api.model.Module;

public record ModuleResponseDTO(
        long id,
        String name
) {
    public ModuleResponseDTO(Module module) {
        this(
                module.getId(),
                module.getName()
        );
    }
}
