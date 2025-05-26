pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS 24.0.2'  
    }

    stages {
        // Stage 1: Checkout Code
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-pat',
                    url: 'https://github.com/tandinomu/Tandinom_02230302_DSO101_A1'
            }
        }

        // Stage 2: Install Backend Dependencies
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        // Stage 3: Install Frontend Dependencies (optional)
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        // Stage 4: Build Backend
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        // Stage 5: Build Frontend (optional)
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Check if build script exists
                        def packageJson = readJSON file: 'package.json'
                        if (packageJson.scripts && packageJson.scripts.build) {
                            sh 'npm run build'
                        } else {
                            echo 'No build script found in frontend package.json, skipping build'
                        }
                    }
                }
            }
        }

        // Stage 6: Run Backend Tests
        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
            post {
                always {
                    // Publish test results from backend
                    publishTestResults testResultsPattern: 'backend/junit.xml'
                }
            }
        }

        // Stage 7: Run Frontend Tests (optional)
        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Check if test script exists
                        def packageJson = readJSON file: 'package.json'
                        if (packageJson.scripts && packageJson.scripts.test) {
                            sh 'npm test -- --watchAll=false'
                        } else {
                            echo 'No test script found in frontend package.json, skipping tests'
                        }
                    }
                }
            }
        }

        // Stage 8: Deploy
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying application...'
                    
                    // Simple deployment example
                    dir('backend') {
                        sh 'echo "Backend deployment successful"'
                    }
                    
                    dir('frontend') {
                        sh 'echo "Frontend deployment successful"'
                    }
                    
                    // Docker deployment example (uncomment if using Docker)
                    /*
                    // Build and push backend Docker image
                    dir('backend') {
                        def backendImage = docker.build("your-dockerhub-username/todo-backend:${env.BUILD_NUMBER}")
                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            backendImage.push()
                            backendImage.push('latest')
                        }
                    }
                    
                    // Build and push frontend Docker image
                    dir('frontend') {
                        def frontendImage = docker.build("your-dockerhub-username/todo-frontend:${env.BUILD_NUMBER}")
                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            frontendImage.push()
                            frontendImage.push('latest')
                        }
                    }
                    */
                }
            }
        }
    }

    post {
        always {
            // Archive artifacts
            archiveArtifacts artifacts: '**/node_modules/.cache/**', allowEmptyArchive: true
            
            // Clean workspace
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}