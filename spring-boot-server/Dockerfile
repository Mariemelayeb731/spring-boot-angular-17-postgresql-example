# Étape 1: Utiliser une image de base de Java
FROM openjdk:17-jdk-slim as build

# Étape 2: Installer curl (pour le healthcheck)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Étape 3: Ajouter le fichier JAR de l'application
COPY target/*.jar app.jar

# Étape 4: Exposer le port que l'application va utiliser
EXPOSE 8080

# Étape 5: Commande pour démarrer l'application
ENTRYPOINT ["java", "-jar", "/app.jar"]
