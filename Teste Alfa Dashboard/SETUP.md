# Ambiente de Desenvolvimento — Teste API Alfa Consultoria

Este guia descreve como configurar e rodar o projeto **Teste API Alfa Consultoria** em um ambiente local de desenvolvimento.

## Pré-requisitos

**Java** Version: 17+

**Maven** Version: 3.9+  

**Node.js** Version: 20+

**npm** Version: 10+  

**PostgreSQL** Version: 15+

## Backend

Necessario a instalação do docker

`docker-compose up -d`

Certifique-se que o Docker está ativo com:

`docker ps`

Deve aparecer algo como:

| Container ID   | Imagem                   | Comando                         | Status         | Porta Local → Container | Nome          |
| -------------- | ------------------------ | ------------------------------- | -------------- | ----------------------- | ------------- |
| `32c5a96c56b5` | `teste_alfa_backend-api` | `java -jar target/app.jar`      | Up (31 min) | `8080 → 8080`           | `spring_api`  |
| `25e22c27c474` | `postgres:16`            | `docker-entrypoint.sh postgres` | Up (31 min) | `5432 → 5432`           | `postgres_db` |



Irá iniciar o backend com suas dependencias e banco de dados PostgreSql

## Frontend

Instale as dependências:

`npm install`

Execute em modo de desenvolvimento:

`npm run dev`

O Vite iniciará em:

`http://localhost:5173`

Certifique-se de que o frontend está configurado para acessar o backend em `http://localhost:8080`.

## Tecnologias Principais

### 🔹 Frontend

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Recharts (gráficos)
- React Query + React Table
- Axios (requisições HTTP)

### 🔹 Backend

- Spring Boot 3.5.7
- Spring Data JPA
- PostgreSQL
- Lombok
- Spring Security
- Java
