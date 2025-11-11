package com.example.teste2_receitas;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.util.stream.Collectors;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

public class Main {
    public static void main(String[] args) throws Exception {
        int port = 8088;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.createContext("/recipes", (HttpExchange exchange) -> {
            try {
                if (!exchange.getRequestMethod().equalsIgnoreCase("GET")) {
                    exchange.sendResponseHeaders(405, -1);
                    return;
                }


                String query = exchange.getRequestURI().getQuery();
                String dish = null;
                if (query != null && query.contains("dish=")) {
                    dish = query.split("dish=")[1];
                }

                if (dish == null || dish.isBlank()) {
                    String response = "{\"error\": \"Parâmetro 'dish' é obrigatório\"}";
                    exchange.sendResponseHeaders(400, response.length());
                    exchange.getResponseBody().write(response.getBytes());
                    exchange.close();
                    return;
                }


                String apiUrl = "https://forkify-api.herokuapp.com/api/search?q=" + dish;
                URL url = new URL(apiUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String result = reader.lines().collect(Collectors.joining());
                reader.close();

                byte[] responseBytes = result.getBytes();
                exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
                exchange.sendResponseHeaders(200, responseBytes.length);
                exchange.getResponseBody().write(responseBytes);
                exchange.close();

            } catch (Exception e) {
                String response = "{\"error\": \"Erro ao processar a requisição\"}";
                exchange.sendResponseHeaders(500, response.length());
                exchange.getResponseBody().write(response.getBytes());
                exchange.close();
            }
        });

        server.start();
        System.out.println("Servidor rodando em http://localhost:" + port + "/recipes?dish=pizza");
    }
}
