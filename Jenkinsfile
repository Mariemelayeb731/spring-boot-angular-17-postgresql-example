pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build -- --configuration production'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'echo "$DOCKER_HUB_CREDENTIALS_PSW" | docker login -u "$DOCKER_HUB_CREDENTIALS_USR" --password-stdin'
                sh 'docker-compose push'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Pipeline exécuté avec succès 🚀'
        }
        failure {
            echo 'Le build ou le déploiement a échoué ❌'
        }
    }
}
