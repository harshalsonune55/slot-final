pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                // Backend/.env, Bot/.env and the root .env (frontend build args) are
                // expected to already exist on the Jenkins agent, e.g. under
                // /var/lib/jenkins/slot-env/.env, backend.env and bot.env
                sh '''
                    cp /var/lib/jenkins/slot-env/.env .env
                    cp /var/lib/jenkins/slot-env/backend.env Backend/.env
                    cp /var/lib/jenkins/slot-env/bot.env Bot/.env

                    docker compose build
                    docker compose up -d
                    docker image prune -f
                '''
            }
        }
    }

    post {
        always {
            sh 'rm -f .env Backend/.env Bot/.env'
        }
        failure {
            echo 'Build or deploy failed — check the console output above.'
        }
    }
}
