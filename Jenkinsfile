pipeline { 
    agent any

    environment {
        SPRING_DATASOURCE_URL = 'jdbc:postgresql://localhost:5432/bezkoder_db'
        SPRING_DATASOURCE_USERNAME = 'bezkoder'
        SPRING_DATASOURCE_PASSWORD = 'bez123'
    }

    stages {
        stage('Cloner le projet') {
            steps {
                git branch: 'master', 
                    url: 'https://github.com/Mariemelayeb731/spring-boot-angular-17-postgresql-example.git'
            }
        }

        stage('Build Angular') {
            steps {
                dir('angular-17-client') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm run build -- --configuration=production'
                }
            }
        }

        stage('Build Spring Boot') {
            steps {
                dir('spring-boot-server') {
                    sh 'mvn clean package -DskipTests'
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
                dir('angular-17-client') {
                    sh 'npm install'
                    sh 'ng test --watch=false --no-progress --browsers=ChromeHeadless || true'
                }
            }
        }

        stage('Tests d\'intégration avec PostgreSQL') {
            steps {
                // Lancer les services Docker de test
                sh 'docker-compose -f docker-compose.test.yml up -d --build --force-recreate'

                // Vérifier que PostgreSQL est prêt depuis le conteneur
                sh '''
                    i=0
                    until docker exec test-postgres pg_isready -h localhost -p 5432 -U bezkoder || [ $i -gt 20 ]; do
                      echo "Waiting for PostgreSQL... ($i)"
                      sleep 2
                      i=$((i+1))
                    done
                '''

                // Lancer les tests d'intégration
                dir('spring-boot-server') {
                    sh 'mvn verify -P integration-tests'
                }

                // Nettoyage des conteneurs
                sh 'docker-compose -f docker-compose.test.yml down'
            }
        }

        stage('Tests End-to-End avec Cypress') {
            steps {
                script {
                    dir('angular-17-client') {
                        sh 'npx http-server ./dist/angular-17-crud -p 4200 &'
                        sh 'npx wait-on http://localhost:4200 --timeout 60000'
                        sh 'curl http://localhost:4200 || true'
                        sh 'xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx cypress run'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    dir('spring-boot-server') {
                        sh 'docker build -t spring-boot-server .'
                    }
                    dir('angular-17-client') {
                        sh 'DOCKER_BUILDKIT=0 docker build -t angular-17-client .
'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose build --no-cache'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'angular-17-client/cypress/screenshots/**/*.png', fingerprint: true
            sh 'docker-compose -f docker-compose.test.yml down -v --remove-orphans'
        }
    }
}
