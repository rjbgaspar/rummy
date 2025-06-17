def notifyDiscord(message) {
  sh """curl -X POST --data '{"content":"${message}"}' --location ${discordWebhook} -H "Content-Type: application/json" """
}

pipeline {
    environment {
        jenkins_ssh = "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
        jenkins_scp = "scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

        registry = 'ark.hangar.live'
        registryCredential = 'docker01'
        imageName = 'rummy'
        deploy = 'lockheed.hangar.live'
        // discordWebhook = ''
        commitMessage = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
    }
    agent any
    stages {
        stage('Cloning SCM') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'git@github.com:rjbgaspar/rummy.git'
            }
        }
        stage('Building image') {
            steps {
    		    script {
    			    dockerImage = docker.build("${imageName}:${env.BUILD_ID}")
    		    }
    	    }
        }
        stage('Push image to registry') {
            steps {
                script {
                    docker.withRegistry("https://$registry", registryCredential) {
                        dockerImage.push("$BUILD_NUMBER")
                        dockerImage.push("latest")
                    }
                }
            }
        }
        stage('Deploy to Lockheed') {
            steps{
                script {
                    sshagent (credentials: ['gvadmin-docker01-github']) {
                    sh '''
                      $jenkins_ssh gvadmin@$deploy mkdir -p app_$imageName
                      $jenkins_scp ./docker-compose.override.prod.yml gvadmin@$deploy:app_$imageName/docker-compose.override.yml
                      $jenkins_scp ./docker-compose.yml gvadmin@$deploy:app_$imageName/docker-compose.yml
                      $jenkins_ssh gvadmin@$deploy <<EOL
                        cd app_$imageName
                        TAG=$BUILD_NUMBER docker compose up -d --remove-orphans
                    '''
                  }
                }
              }
            }
          }
    }
    post {
        success {
            // notifyDiscord("Deployed successfully ${imageName}:${BUILD_NUMBER} with message: ${commitMessage}")
        }
        failure {
            // notifyDiscord("--- FAIL --- Failed to deploy ${imageName}:${BUILD_NUMBER} with message: ${commitMessage}")
        }
        always {
            echo 'This will always run'
        }
    }
}
