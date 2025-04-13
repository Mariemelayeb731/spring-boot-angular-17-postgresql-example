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
        
        stage('Tests d\'intégration avec PostgreSQL') {
    steps {
        sh 'docker-compose -f docker-compose.test.yml up -d'
        sh 'sleep 30'  // Attend 30 secondes pour s'assurer que PostgreSQL est prêt
        dir('spring-boot-server') {
            sh 'mvn verify -P integration-tests'
}

 sh 'docker-compose -f docker-compose.test.yml down'
    }
}
stage('Tests End-to-End avec Cypress') {
    steps {
        dir('angular-17-client') {
            sh 'xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx cypress run'
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
}
