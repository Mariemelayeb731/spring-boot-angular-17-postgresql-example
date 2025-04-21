# Étape 1 : Image de base Java
FROM openjdk:17-jdk-slim

# Étape 2 : Installer curl pour les healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Étape 3 : Copier le fichier .jar de l'application
COPY target/*.jar /app.jar

# Étape 4 : Exposer le port
EXPOSE 8080

# Étape 5 : Démarrer l'application directement
ENTRYPOINT ["java", "-jar", "/app.jar"]
