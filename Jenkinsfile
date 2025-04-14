pipeline { 
    agent any

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
                sh 'docker-compose -f docker-compose.test.yml up -d'
                sh 'sleep 30'  // Attente pour laisser PostgreSQL démarrer
                dir('spring-boot-server') {
                    sh 'mvn verify -P integration-tests'
                }
                sh 'docker-compose -f docker-compose.test.yml down'
            }
        }

        stage('Tests End-to-End avec Cypress') {
            steps {
                script {
                    dir('angular-17-client') {
                        // Lancer http-server en arrière-plan sans le bloquer
                        sh 'nohup npx http-server ./dist/angular-17-crud -p 4200 > http-server.log 2>&1 &'

                        // Attendre que le serveur soit disponible
                        sh 'npx wait-on http://localhost:4200 --timeout 60000'

                        // Vérifier l'accès à l'application
                        sh 'curl http://localhost:4200 || true'

                        // Lancer les tests Cypress
                        sh 'xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx cypress run'

                        // Optionnel : tuer http-server après les tests
                        sh "pkill -f 'http-server.*4200' || true"
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
                        sh 'docker build -t angular-17-client .'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            // Archive les captures d’écran de Cypress en cas d’échec
            archiveArtifacts artifacts: 'angular-17-client/cypress/screenshots/**/*.png', fingerprint: true
        }
    }
}
