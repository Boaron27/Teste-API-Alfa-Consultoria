package com.example.teste2_receitas.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@RestController
public class RecipeController {

    private static final String API_URL = "https://forkify-api.herokuapp.com/api/search?q=";

    @GetMapping("/recipes")
    public ResponseEntity<JsonNode> getRecipes(@RequestParam String dish) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = API_URL + dish;
            String result = restTemplate.getForObject(url, String.class);


            ObjectMapper mapper = new ObjectMapper();
            JsonNode json = mapper.readTree(result);


            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ObjectMapper().createObjectNode().put("error", "Erro ao buscar receitas"));
        }
    }
}
