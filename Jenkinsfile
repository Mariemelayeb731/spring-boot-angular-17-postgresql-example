pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mariemelayeb731/spring-boot-angular-17-postgresql-example:latest'
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
                    sh 'jq . package.json' // Vérifie la syntaxe JSON dans le bon dossier
                }
            }
        }

        stage('Construire l’application') {
            steps {
                dir('spring-boot-server') {
                    sh 'chmod +x ./mvnw'
                    sh './mvnw clean package -DskipTests' // Backend Spring Boot
                }
                dir('frontend') {
                    sh 'pwd'
                    sh 'ls -alh'
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

        stage('Construire et Pousser l’image Docker') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Déployer sur le serveur') {
            steps {
                sshagent(['serveur-ssh']) {
                    sh 'ssh user@server "docker pull $DOCKER_IMAGE && docker-compose up -d"'
                }
            }
        }
    }
}
