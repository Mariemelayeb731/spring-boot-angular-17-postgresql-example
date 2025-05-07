# syntax=docker/dockerfile:1.6
FROM node:20-alpine AS builder
WORKDIR /app

# Installer les outils de build essentiels
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci --no-audit --prefer-offline

COPY . .
RUN npm run build

# Image finale
FROM nginx:1.25-alpine
COPY --from=builder /app/dist/angular-17-crud /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
