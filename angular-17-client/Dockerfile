FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY angular-17-client/ ./
RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist/angular-17-crud /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]

