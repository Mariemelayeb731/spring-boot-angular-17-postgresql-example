# Étape 1 : Build Frontend
FROM node:20 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/ ./
RUN npm install
RUN npm run build

# Étape 2 : Build Backend
FROM maven:3.9.6-eclipse-temurin-17 AS backend-builder
WORKDIR /app/backend
COPY spring-boot-server/ ./
RUN ./mvnw clean package -DskipTests

# Étape 3 : Image finale
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=backend-builder /app/backend/target/*.jar app.jar
COPY --from=frontend-builder /app/frontend/dist/frontend/ /app/public/
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
