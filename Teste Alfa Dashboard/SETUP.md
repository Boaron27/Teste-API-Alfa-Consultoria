# Ambiente de Desenvolvimento — Teste API Alfa Consultoria

Este guia descreve como configurar e rodar o projeto **Teste API Alfa Consultoria** em um ambiente local de desenvolvimento.

## Pré-requisitos

**Java** Version: 17+
**Maven** Version: 3.9+  
**Node.js** Version: 20+
**npm** Version: 10+  
**PostgreSQL** Version: 15+

## Configuração do Banco de Dados

Crie um banco de dados local:

CREATE DATABASE alfa_consultoria;

Atualize o arquivo de configuração do Spring Boot:  
 Edite `backend/src/main/resources/application.properties` (ou `application.yml`) com suas credenciais:

###

spring.datasource.url=jdbc:postgresql://localhost:5432/Ticket
spring.datasource.username=postgres
spring.datasource.password=123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

###

---

## Backend(API)

Instale dependências e rode no cmd:

`mvn clean install`
`mvn spring-boot:run`

A API iniciará por padrão em:

`http://localhost:8080`

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
