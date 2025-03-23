# Utiliser une image de base avec OpenJDK
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier jar compilé dans l'image
COPY target/spring-boot-jpa-postgresql-0.0.1-SNAPSHOT.jar app.jar


# Exposer le port 8080 pour l'application Spring Boot
EXPOSE 8080

# Démarrer l'application Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
