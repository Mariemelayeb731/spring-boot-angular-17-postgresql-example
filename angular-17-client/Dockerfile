FROM node:18-alpine as build

# Travailler dans le dossier de l'application Angular
WORKDIR /app

# Copier les fichiers Angular (depuis le sous-dossier angular-17-client)
COPY angular-17-client/package*.json ./
RUN npm install

# Copier le reste de l'application Angular
COPY angular-17-client/ ./

# Compiler l'application Angular
RUN npm run build --configuration production

# Étape de production avec Nginx
FROM nginx:alpine

# Copier les fichiers compilés Angular dans Nginx
COPY --from=build /app/dist/angular-17-crud /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
