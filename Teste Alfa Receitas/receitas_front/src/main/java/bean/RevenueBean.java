package bean;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;
import java.io.Serializable;
import java.net.http.*;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Revenue;

@Named("revenueBean")
@RequestScoped
public class RevenueBean implements Serializable {

    private String dish;
    private List<Revenue> revenues = new ArrayList<>();

    public String getDish() { return dish; }
    public void setDish(String dish) { this.dish = dish; }
    public List<Revenue> getRevenues() { return revenues; }

    public void buscarReceitas() {
        try {
            if (dish == null || dish.isBlank()) {
                revenues.clear();
                System.out.println("⚠ Nenhum prato informado.");
                return;
            }

            String url = "http://localhost:8088/recipes?dish=" + dish.trim();
            System.out.println("🌐 Buscando em: " + url);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();
            System.out.println("📦 Resposta da API: " + responseBody);

            if (response.statusCode() == 200) {
                ObjectMapper mapper = new ObjectMapper();

                // Lê o JSON completo
                JsonNode root = mapper.readTree(responseBody);

                // A lista está dentro de "recipes"
                JsonNode recipesNode = root.path("recipes");

                if (recipesNode.isArray()) {
                    revenues = mapper.readValue(
                            recipesNode.toString(),
                            new TypeReference<List<Revenue>>() {}
                    );
                    System.out.println("Receitas encontradas: " + revenues.size());
                } else {
                    System.out.println("O campo 'recipes' não é um array ou está ausente.");
                    revenues.clear();
                }
            } else {
                revenues.clear();
                System.out.println("Erro na API: HTTP " + response.statusCode());
            }

        } catch (Exception e) {
            e.printStackTrace();
            revenues.clear();
        }
    }
}
