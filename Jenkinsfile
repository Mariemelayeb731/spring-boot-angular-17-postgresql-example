pipeline { 
    agent any

    environment {
        SPRING_DATASOURCE_URL = 'jdbc:postgresql://postgres:5432/bezkoder_db' // Modifié localhost -> postgres
        SPRING_DATASOURCE_USERNAME = 'bezkoder'
        SPRING_DATASOURCE_PASSWORD = 'bez123'
    }

    stages {
        // ... Les autres stages restent inchangés ...

        stage('Tests d\'intégration avec PostgreSQL') {
            steps {
                script {
                    // Nettoyage agressif avant démarrage
                    sh 'docker-compose -f docker-compose.test.yml down -v --remove-orphans --rmi local || true'
                    
                    // Démarrage avec build et recréation forcée
                    sh 'docker-compose -f docker-compose.test.yml up -d --build --force-recreate'

                    // Attente basée sur le healthcheck Docker
                    sh '''
                        timeout 60s bash -c "until docker inspect --format='{{json .State.Health.Status}}' \$(docker-compose -f docker-compose.test.yml ps -q postgres) | grep -q '\"healthy\"'; do \
                            echo 'Waiting for PostgreSQL...'; \
                            sleep 5; \
                        done"
                    '''

                    // Exécution des tests avec profil d'intégration
                    dir('spring-boot-server') {
                        sh 'mvn verify -P integration-tests'
                    }
                }
            }
            post {
                always {
                    // Archivage des logs en cas d'échec
                    sh 'docker-compose -f docker-compose.test.yml logs --no-color > docker-logs.txt'
                    archiveArtifacts artifacts: 'docker-logs.txt', fingerprint: true
                    
                    // Nettoyage garantie même en cas d'échec
                    sh 'docker-compose -f docker-compose.test.yml down -v --remove-orphans --rmi local || true'
                }
            }
        }

        // ... Les autres stages restent inchangés ...
    }

    post {
        always {
            // Nettoyage global supplémentaire
            sh 'docker system prune -af || true'
            sh 'docker volume prune -f || true'
        }
    }
}