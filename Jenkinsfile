pipeline {
    agent any

    stages {
        stage('Cloner le projet') {
            steps {
                git 'https://github.com/Mariemelayeb731/spring-boot-angular-17-postgresql-example.git'
            }
        }

        stage('Build Angular') {
            steps {
                dir('angular-17-client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Spring Boot') {
            steps {
                dir('spring-boot-server') {
                    sh './mvnw clean package'
                }
            }
        }

        stage('Tests') {
            steps {
                echo 'Lancer les tests ici'
                // Ajoute des étapes de test si besoin
            }
        }

        stage('Deploy (optionnel)') {
            steps {
                echo 'Déploiement (Docker, Nginx, etc.)'
                // Tu peux dockeriser l’app ici plus tard
            }
        }
    }
}
