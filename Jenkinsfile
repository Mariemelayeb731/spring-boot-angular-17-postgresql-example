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

        
        stage('Build Docker Images') {
            steps {
                timeout(time: 20, unit: 'MINUTES') {
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
        }

        stage('Deploy') {
            steps {
                timeout(time: 20, unit: 'MINUTES') {
                    sh 'docker-compose build --no-cache'
                    sh 'docker-compose up -d'
                }
            }
        }
        
    }

    post {
        always {
        
            sh 'docker-compose -f docker-compose.test.yml down -v --remove-orphans'
        }
    }
}

