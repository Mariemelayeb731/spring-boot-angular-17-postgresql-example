# Étape 1 : Construire l'application Angular
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package.json package-lock.json ./ 

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod


# Étape 2 : Servir avec Nginx
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente vers le dossier nginx
COPY --from=build /app/dist/angular-17-crud /usr/share/nginx/html

# Ajouter la configuration de nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf


