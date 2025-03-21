pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'spring-boot-backend'
        DOCKER_IMAGE_FRONTEND = 'angular-frontend'
        DOCKER_REGISTRY = 'dockerhub'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE_BACKEND, './spring-boot-backend')
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE_FRONTEND, './angular-frontend')
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials') {
                        docker.image(DOCKER_IMAGE_BACKEND).push()
                        docker.image(DOCKER_IMAGE_FRONTEND).push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Build and Deploy succeeded!'
        }
        failure {
            echo 'Build or Deploy failed.'
        }
    }
}
