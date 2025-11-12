# Ambiente de Desenvolvimento — Teste Receitas Alfa Consultoria

Este guia descreve como configurar e rodar o projeto **Teste Receitas Alfa Consultoria** em um ambiente local de desenvolvimento.

---

## Pré-requisitos

**Java** Version: 17+  
**Maven** Version: 3.9+  
**Payara Server** Version: 6.2024+ *(Jakarta EE 10)*  

---

## Frontend (JSF + PrimeFaces)

O frontend é uma aplicação **Jakarta EE (JSF + PrimeFaces)** e roda dentro do **Payara Server**.

### Instalação e Execução

Compile o projeto:
   ```bash
   mvn clean package
   ```
Localize o arquivo gerado em:
   ```
   target/receitas_front.war
   ```
Copie o `.war` para o diretório de autodeploy do Payara:
   ```
   payara6/glassfish/domains/domain1/autodeploy/
   ```
Inicie o servidor:
   ```bash
   asadmin start-domain domain1
   ```
Acesse no navegador:
    **http://localhost:8080/receitas_front**

**Importante:**  
Certifique-se de que o backend (Spring Boot) está em execução antes de abrir o frontend no Payara.

---

##  Tecnologias Principais

###  Frontend

- Jakarta EE 10  
- JSF 4  
- PrimeFaces 15 (Jakarta)  
- Payara Server 6  
- XHTML + CSS  

###  Backend

- Spring Boot 3.5.7  
- Spring Data JPA  
- Lombok  
- Spring Security  
- Java 17  

---

