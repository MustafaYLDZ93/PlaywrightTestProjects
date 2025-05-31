pipeline {
    agent any

    parameters {
        string(name: 'GREP', defaultValue: '', description: 'Çalıştırılacak test etiketi veya başlığı (ör: @login, @validlogin). Boş bırakılırsa tüm testler çalışır.')
    }

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                    echo "=== PATH ==="
                    echo $PATH
                    node --version
                    npm --version
                    pwd
                    ls -la
                '''
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
                    def grepOption = params.GREP?.trim() ? "--grep '${params.GREP}'" : ""
                    sh "npx playwright test ${grepOption}"
                }
            }
        }

        stage('Archive Playwright Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit 'test-results/**/*.xml'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}