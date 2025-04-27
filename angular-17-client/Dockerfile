# Étape 1: Utiliser une image de base de Node.js à jour
FROM node:18.18.0 AS build

# Étape 2: Définir le répertoire de travail
WORKDIR /app

# Étape 3: Copier les fichiers de dépendances
COPY package*.json ./

# Étape 4: Installer les dépendances
RUN npm install

# Étape 5: Copier tout le code source
COPY . .

# Étape 6: Construire l'application Angular


RUN npm run build -- --configuration=production --project=angular-17-crud

# Étape 7: Utiliser une image Nginx minimale pour servir l'app
FROM nginx:alpine

# Étape 8: Copier les fichiers du build dans le dossier Nginx
COPY ./dist/angular-17-crud /usr/share/nginx/html

# Étape 9: (Optionnel) Remplacer le fichier de config Nginx si besoin
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Étape 10: Exposer le port 80
EXPOSE 80
