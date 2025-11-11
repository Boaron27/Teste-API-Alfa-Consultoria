FROM ubuntu:latest
LABEL authors="Gabriel"

ENTRYPOINT ["top", "-b"]

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]