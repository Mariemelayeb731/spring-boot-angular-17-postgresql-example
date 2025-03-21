# Étape 1 : Utiliser une image de base Node.js pour construire l'application
FROM node:18-alpine as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application Angular en mode production
RUN npm run build -- --configuration production

# Exposer le port 80
EXPOSE 82


