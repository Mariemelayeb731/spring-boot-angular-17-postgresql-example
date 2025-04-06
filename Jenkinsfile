pipeline {
    agent any
    
    tools {
        nodejs 'nodejs'  // Must match exact name in Jenkins Global Tools
        maven 'Maven-3.9.9'
    }

    environment {
        // Force PATH to include NodeJS binaries first
        PATH = "${tool 'nodejs'}/bin:${env.PATH}"
        NODE_ENV = 'production'
        MAVEN_OPTS = '-Xmx1024m'
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
                dir('angular-17-client') {
                    script {
                        // Debugging: Print environment info
                        sh '''
                            echo "Node path: $(which node)"
                            echo "NPM path: $(which npm)"
                            node --version
                            npm --version
                        '''
                        
                        // Install dependencies (use --force if needed)
                        sh 'npm install --force'
                        
                        // Build Angular with detailed logging
                        sh 'npm run build -- --configuration=production --verbose'
                    }
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
    }

    post {
        failure {
            echo 'Build failed! See logs for details.'
            archiveArtifacts artifacts: '**/logs/*.log', allowEmptyArchive: true
        }
    }
}