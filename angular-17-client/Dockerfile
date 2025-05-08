FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
# Chemin corrigé (en supposant que nginx.conf est à la racine du projet)
COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/angular-17-crud /usr/share/nginx/html
