# Étape 1: Utiliser une image de base de Java
FROM openjdk:17-jdk-slim as build

# Étape 2: Ajouter le fichier JAR de l'application
COPY target/*.jar app.jar

# Étape 3: Exposer le port que l'application va utiliser
EXPOSE 8081

# Étape 4: Commande pour démarrer l'application
ENTRYPOINT ["java", "-jar", "/app.jar"]
