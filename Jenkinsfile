pipeline {
    agent any

    environment {
        SPRING_DATASOURCE_URL = 'jdbc:postgresql://localhost:5434/bezkoder_db'
        SPRING_DATASOURCE_USERNAME = 'bezkoder'
        SPRING_DATASOURCE_PASSWORD = 'bez123'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Cloner le projet') {
            steps {
                git url: 'https://github.com/Mariemelayeb731/spring-boot-angular-17-postgresql-example.git'
            }
        }

        stage('Build Angular') {
            steps {
                dir('angular-client') {
                    sh 'npm install'
                    sh 'npm run build --prod'
                }
            }
        }

        stage('Build Spring Boot') {
            steps {
                dir('spring-boot-server') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Tests Unitaires Spring Boot') {
            steps {
                dir('spring-boot-server') {
                    sh 'mvn test'
                }
            }
        }

        stage('Tests unitaires Frontend') {
            steps {
                dir('angular-client') {
                    sh 'npm run test-headless'
                }
            }
        }

        stage('Tests d\'intégration avec PostgreSQL') {
            steps {
                // Démarrer les conteneurs avec docker-compose.test.yml
                sh 'docker-compose -f docker-compose.test.yml up -d --build --force-recreate'

                // Attendre que PostgreSQL dans le conteneur soit prêt
                sh '''
                    i=0
                    until docker exec test-postgres pg_isready -h localhost -p 5432 -U bezkoder || [ $i -gt 20 ]; do
                      echo "Waiting for PostgreSQL to be ready... ($i)"
                      sleep 2
                      i=$((i+1))
                    done
                '''

                // Exécuter les tests d'intégration avec le bon profil Maven
                dir('spring-boot-server') {
                    sh 'mvn verify -P integration-tests -X'
                }

                // Nettoyer les conteneurs
                sh 'docker-compose -f docker-compose.test.yml down'
            }
        }

        stage('Tests End-to-End avec Cypress') {
            steps {
                dir('angular-client') {
                    sh 'npx cypress run'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose -f docker-compose.yml build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose -f docker-compose.yml up -d'
            }
        }
    }

    post {
        always {
            echo 'Nettoyage des ressources...'
            sh 'docker-compose -f docker-compose.test.yml down || true'
            sh 'docker-compose -f docker-compose.yml down || true'
        }
    }
}
