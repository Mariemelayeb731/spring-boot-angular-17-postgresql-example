pipeline {
    agent any

    environment {
        SPRING_DATASOURCE_URL = 'jdbc:postgresql://localhost:5432/bezkoder_db'
        SPRING_DATASOURCE_USERNAME = 'bezkoder'
        SPRING_DATASOURCE_PASSWORD = 'bez123'
        DOCKER_IMAGE_BACKEND = 'mariemelayeb/project-backend:latest'
        DOCKER_IMAGE_FRONTEND = 'mariemelayeb/project-angular:latest'
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
                timeout(time: 20, unit: 'MINUTES') {
                    dir('angular-17-client') {
                        sh 'npm install'
                        sh 'npm run build'
                        sh 'npm run build -- --configuration=production'
                    }
                }
            }
        }

        stage('Build Spring Boot') {
            steps {
                timeout(time: 20, unit: 'MINUTES') {
                    dir('spring-boot-server') {
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }

        stage('Tests Unitaires Spring Boot') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    dir('spring-boot-server') {
                        sh 'mvn test'
                    }
                }
            }
        }

        stage('Tests unitaires Frontend') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    dir('angular-17-client') {
                        sh 'npm install'
                        sh 'ng test --watch=false --no-progress --browsers=ChromeHeadless || true'
                    }
                }
            }
        }

        stage('Tests d\'intégration avec PostgreSQL') {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
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
        }

        stage('Build et Push Docker Images') {
            steps {
                timeout(time: 20, unit: 'MINUTES') {
                    script {
                        dir('spring-boot-server') {
                            sh 'docker build -t $DOCKER_IMAGE_BACKEND .'
                            sh 'docker push $DOCKER_IMAGE_BACKEND'
                        }
                        dir('angular-17-client') {
                            sh 'docker build -t $DOCKER_IMAGE_FRONTEND .'
                            sh 'docker push $DOCKER_IMAGE_FRONTEND'
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    sh 'kubectl apply -f k8s/'
                }
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
