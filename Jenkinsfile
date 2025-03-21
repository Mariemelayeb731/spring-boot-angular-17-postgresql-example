pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mariemelayeb731 spring-boot-angular-17-postgresql-example:latest'
    }

    stages {
        stage('Cloner le projet') {
            steps {
                git branch: 'main', url: 'https://github.com/Mariemelayeb731/spring-boot-angular-17-postgresql-example.git'
            }
        }

        stage('Vérifier package.json') {
            steps {
                sh 'jq . package.json' // Vérifie la syntaxe JSON avant npm install
            }
        }

        stage('Construire l’application') {
            steps {
                dir('spring-boot-server'){
                sh './mvnw clean package -DskipTests' }// Backend Spring Boot
                
                sh 'npm install' // Installer les dépendances Angular
                sh 'npm run build' // Construire l'application Angular
            }
        }
    }}
