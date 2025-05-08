# Étape 1 : Construire l'application Angular
FROM node:18-alpine as angular-builder
WORKDIR /app
COPY angular-17-client/package.json angular-17-client/package-lock.json ./
RUN npm install
COPY angular-17-client .
RUN npm run build

# Étape 2 : Servir avec Nginx
FROM nginx:alpine
# Corrigez le chemin pour pointer vers angular-17-crud
COPY --from=angular-builder /app/dist/angular-17-crud /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
