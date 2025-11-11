package com.alfa.api.controller;

import com.alfa.api.repository.ModuleRepository;
import com.alfa.api.service.ModuleResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/module")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ModuleController {

    @Autowired
    private ModuleRepository moduleRepository;

    @GetMapping
    public List<ModuleResponseDTO> getAll() {
        return moduleRepository.findAll()
                .stream()
                .map(ModuleResponseDTO::new)
                .toList();
    }
}
