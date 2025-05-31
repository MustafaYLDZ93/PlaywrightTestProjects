pipeline {
    agent any

    parameters {
        string(name: 'GREP', defaultValue: '', description: 'Çalıştırılacak test etiketi veya başlığı (ör: @validlogin)')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Node.js') {
            steps {
                // Eğer Node.js yüklü değilse yükleyin
                sh 'node -v || curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    if (params.GREP?.trim()) {
                        sh "npx playwright test --grep '${params.GREP}'"
                    } else {
                        sh 'npx playwright test'
                    }
                }
            }
        }
        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
            junit 'test-results/**/*.xml'
        }
    }
}