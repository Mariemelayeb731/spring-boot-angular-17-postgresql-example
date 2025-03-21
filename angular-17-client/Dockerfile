# Utiliser l'image officielle Node.js pour construire l'application
FROM node:18 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste de l'application Angular et la construire
COPY . .
RUN npm run build --prod
# Exposer le port 80
EXPOSE 4230
