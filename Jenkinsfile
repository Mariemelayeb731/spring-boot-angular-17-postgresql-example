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

       
        stage('Tests Unitaires Angular') {
    steps {
        dir('angular-17-client') {
            script {
                // Set the CHROME_BIN environment variable if not already set
                sh 'export CHROME_BIN=/usr/bin/chromium-browser'  // Adjust this path as needed
                sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
            }
        }
    }
}


        stage('Tests d\'intégration avec PostgreSQL') {
            steps {
                dir('spring-boot-server') {
                    sh 'docker-compose -f docker-compose.test.yml up -d'
                    sh 'mvn verify -P integration-tests'
                    sh 'docker-compose -f docker-compose.test.yml down'
                }
            }
        }

        stage('Tests End-to-End avec Cypress') {
            steps {
                dir('angular-17-client') {
                    sh 'npx cypress run'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Construire chaque image séparément avec le bon contexte
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
