pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mariemelayeb731/spring-boot-angular-17-postgresql-example:latest'
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
                dir('spring-boot-server') {
                    sh 'chmod +x ./mvnw'
                    sh './mvnw clean package -DskipTests' // Backend Spring Boot
                }
                dir('angular-17-client') {
            sh 'pwd' // Afficher le répertoire courant pour vérifier où tu es
            sh 'ls -alh' // Vérifier que angular.json est bien présent
            sh 'npm install' // Installer les dépendances Angular
            sh 'npm run build' // Construire l'application Angular
        }
            }
        }
    }
}
