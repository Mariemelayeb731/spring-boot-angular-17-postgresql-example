pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        APP_NAME = 'spring-angular-app'
        VERSION = "${env.BUILD_ID}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    dir('backend') {
                        sh 'mvn test'
                    }
                    dir('frontend') {
                        sh 'npm test'
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build backend image
                    sh "docker build -t ${APP_NAME}-backend:${VERSION} -f backend/Dockerfile backend/"
                    
                    // Build frontend image
                    sh "docker build -t ${APP_NAME}-frontend:${VERSION} -f frontend/Dockerfile frontend/"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    sh "echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin"
                    
                    // Tag and push backend image
                    sh "docker tag ${APP_NAME}-backend:${VERSION} ${DOCKER_HUB_CREDENTIALS_USR}/${APP_NAME}-backend:${VERSION}"
                    sh "docker push ${DOCKER_HUB_CREDENTIALS_USR}/${APP_NAME}-backend:${VERSION}"
                    
                    // Tag and push frontend image
                    sh "docker tag ${APP_NAME}-frontend:${VERSION} ${DOCKER_HUB_CREDENTIALS_USR}/${APP_NAME}-frontend:${VERSION}"
                    sh "docker push ${DOCKER_HUB_CREDENTIALS_USR}/${APP_NAME}-frontend:${VERSION}"
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Arrêter et supprimer les anciens conteneurs
                    sh "docker-compose down || true"
                    
                    // Démarrer les nouveaux conteneurs
                    sh "docker-compose up -d"
                }
            }
        }
    }
    
    post {
        always {
            // Nettoyage
            sh 'docker system prune -f'
        }
        success {
            slackSend(color: 'good', message: "Build réussi: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            slackSend(color: 'danger', message: "Build échoué: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}