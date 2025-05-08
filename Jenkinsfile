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

        stage('Tests Unitaires') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('spring-boot-server') {
                            sh 'mvn test'
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('angular-17-client') {
                            sh 'npm install'
                            sh 'ng test --watch=false --browsers=ChromeHeadless || true'
                        }
                    }
                }
            }
        }

        stage('Tests Intégration PostgreSQL') {
            steps {
                sh 'docker-compose -f docker-compose.test.yml up -d --build --force-recreate'
                sh '''
                    i=0
                    until docker exec test-postgres pg_isready -h localhost -p 5432 -U bezkoder || [ $i -gt 20 ]; do
                      echo "Waiting for PostgreSQL... ($i)"
                      sleep 2
                      i=$((i+1))
                    done
                '''
                dir('spring-boot-server') {
                    sh 'mvn verify -P integration-tests'
                }
                sh 'docker-compose -f docker-compose.test.yml down'
            }
        }

        stage('Déclencher CD') {
            steps {
                build job: 'cd-pipeline', wait: true  // Déclenche le pipeline CD une fois que CI est terminé
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
