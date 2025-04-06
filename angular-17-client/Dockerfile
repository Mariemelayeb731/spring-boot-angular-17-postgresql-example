# Étape 1: Utiliser une image de base de Node.js
FROM node:18.13 AS build

# Étape 2: Définir le répertoire de travail
WORKDIR /app

# Étape 3: Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4: Installer les dépendances
RUN npm install

# Étape 5: Copier le code de l'application Angular
COPY . .

# Étape 6: Construire l'application
RUN npm run build --prod

# Étape 7: Utiliser une image Nginx pour servir l'application
FROM nginx:alpine

# Étape 8: Copier le build Angular dans le répertoire de Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

# Étape 9: Exposer le port 80 pour Nginx
EXPOSE 80
