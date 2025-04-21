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
        sh 'docker-compose -f docker-compose.test.yml up -d --build --force-recreate'
        
        // Attente simplifiée grâce au healthcheck
        sleep(time: 15, unit: 'SECONDS') 

        dir('spring-boot-server') {
            sh 'mvn verify -P integration-tests -Dspring.datasource.url=jdbc:postgresql://postgres:5432/bezkoder_db'
        }

        post {
            always {
                sh 'docker-compose -f docker-compose.test.yml logs springboot > springboot.log'
                sh 'docker-compose -f docker-compose.test.yml down -v'
                archiveArtifacts artifacts: 'springboot.log', fingerprint: true
            }
        }
    }
}

        stage('Tests End-to-End avec Cypress') {
            steps {
                dir('angular-17-client') {
                    sh 'npx http-server ./dist/angular-17-crud -p 4200 &'
                    sh 'npx wait-on http://localhost:4200 --timeout 60000'
                    sh 'curl http://localhost:4200 || true'
                    sh 'xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx cypress run'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('spring-boot-server') {
                    sh 'docker build -t spring-boot-server .'
                }
                dir('angular-17-client') {
                    sh 'docker build -t angular-17-client .'
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
        }
    }
}
