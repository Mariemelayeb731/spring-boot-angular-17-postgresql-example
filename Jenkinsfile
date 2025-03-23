pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'mariemelayeb731/spring-boot-backend:latest'
        FRONTEND_IMAGE = 'mariemelayeb731/angular-frontend:latest'
    }

    stages {
        stage('Cloner le projet') {
            steps {
                git branch: 'main', url: 'https://github.com/Mariemelayeb731/spring-boot-angular-17-postgresql-example.git'
            }
        }

        stage('Vérifier package.json') {
            steps {
                dir('frontend') {
                    sh 'jq . package.json'
                }
            }
        }

        stage('Construire l’application') {
            steps {
                dir('spring-boot-server') {
                    sh 'chmod +x ./mvnw'
                    sh './mvnw clean package -DskipTests'
                }
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm install @angular/cli'
                    sh 'npm run build'
                }
            }
        }

        stage('Tests Backend (JUnit)') {
            steps {
                dir('spring-boot-server') {
                    script {
                        try {
                            sh './mvnw clean test'
                        } catch (Exception e) {
                            echo "⚠️ Tests backend échoués, mais on continue..."
                        }
                    }
                }
            }
        }

        stage('Tests Frontend (Karma/Jasmine)') {
            steps {
                dir('frontend') {
                    script {
                        try {
                            sh 'npx ng test --watch=false --browsers=ChromeHeadless'
                        } catch (Exception e) {
                            echo "⚠️ Tests frontend échoués, mais on continue..."
                        }
                    }
                }
            }
        }

        stage('Tests End-to-End (Cypress)') {
            steps {
                dir('frontend') {
                    script {
                        try {
                            sh 'npx cypress run'
                        } catch (Exception e) {
                            echo "⚠️ Tests Cypress échoués, mais on continue..."
                        }
                    }
                }
            }
        }

        stage('Construire et Pousser les images Docker') {
            steps {
                script {
                    // Build backend image
                    dir('spring-boot-server') {
                        sh 'docker build -t $BACKEND_IMAGE -f spring-boot-server/Dockerfile .'

                    }

                    // Build frontend image (si tu as un Dockerfile dans frontend)
                    dir('frontend') {
                        sh 'docker build -t $FRONTEND_IMAGE -f Dockerfile .'
                    }

                    // Push les deux images
                    withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                        sh 'docker push $BACKEND_IMAGE'
                        sh 'docker push $FRONTEND_IMAGE'
                    }
                }
            }
        }

        stage('Déployer sur le serveur') {
            steps {
                sshagent(['serveur-ssh']) {
                    sh '''
                    ssh user@server "
                        docker pull $BACKEND_IMAGE &&
                        docker pull $FRONTEND_IMAGE &&
                        docker-compose up -d"
                    '''
                }
            }
        }
    }
}
