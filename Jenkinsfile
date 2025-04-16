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
