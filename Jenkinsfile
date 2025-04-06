pipeline {
    agent any
    
    tools {
        // Ces noms doivent correspondre EXACTEMENT à ceux configurés dans Jenkins > Manage Jenkins > Tools
        nodejs 'nodejs'  // Nom de l'installation NodeJS dans Jenkins
        maven 'Maven-3.9.9'  // Nom de l'installation Maven dans Jenkins
    }

    environment {
        // Variables d'environnement optionnelles
        NODE_ENV = 'production'
        MAVEN_OPTS = '-Xmx1024m'
    }

    stages {
        stage('Cloner le projet') {
            steps {
                git branch: 'master',
                url: 'https://github.com/Mariemelayeb731/spring-boot-angular-17-postgresql-example.git',
                credentialsId: ''  // Ajoutez un ID de credentials si nécessaire
            }
        }

        stage('Build Angular') {
            steps {
                dir('angular-17-client') {
                    script {
                        try {
                            // Vérifie que NodeJS/npm sont disponibles
                            sh 'node --version'
                            sh 'npm --version'
                            
                            // Installer les dépendances et builder
                            sh 'npm ci --no-audit'  // Plus sécurisé que npm install
                            sh 'npm run build -- --configuration=production'
                            
                            // Archive les artefacts si besoin
                            archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                        } catch (err) {
                            error "Échec du build Angular: ${err.message}"
                        }
                    }
                }
            }
        }

        stage('Build Spring Boot') {
            steps {
                dir('spring-boot-server') {
                    script {
                        try {
                            sh 'mvn --version'
                            sh 'mvn clean package -DskipTests'
                            
                            // Archive le JAR généré
                            archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                        } catch (err) {
                            error "Échec du build Spring Boot: ${err.message}"
                        }
                    }
                }
            }
        }

        stage('Tests') {
            steps {
                parallel (
                    "Tests Angular": {
                        dir('angular-17-client') {
                            sh 'npm test -- --watch=false --browsers=ChromeHeadless'
                        }
                    },
                    "Tests Spring Boot": {
                        dir('spring-boot-server') {
                            sh 'mvn test'
                        }
                    }
                )
            }
        }

        stage('Deploy (optionnel)') {
            when {
                expression { env.BRANCH_NAME == 'master' }  // Exécution conditionnelle
            }
            steps {
                script {
                    echo "Déploiement en cours..."
                    // Ici vous pourriez ajouter :
                    // - Un déploiement Docker
                    // - Un déploiement sur un serveur
                    // - Une notification Slack/Email
                }
            }
        }
    }

    post {
        always {
            echo 'Nettoyage après build...'
            cleanWs()  // Nettoie le workspace
        }
        success {
            echo 'Build réussi! ✅'
            // slackSend channel: '#dev', message: "Build ${env.JOB_NAME} réussi"
        }
        failure {
            echo 'Build échoué! ❌'
            // mail to: 'team@example.com', subject: "Échec du build ${env.JOB_NAME}", body: "Voir les logs: ${env.BUILD_URL}"
        }
    }
}