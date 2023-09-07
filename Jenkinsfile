pipeline{
   agent any
   environment {
        TAG = sh(returnStdout: true, script: "git describe --tags --abbrev=0").trim()
    }
    stages{
        stage("Build"){   
            steps{
                sh "docker build -t 38.242.195.64:7000/passengerwebapp:${TAG} -f dockerfile.production ."
                sh "docker tag 38.242.195.64:7000/passengerwebapp:${TAG} 38.242.195.64:7000/passengerwebapp:latest"
            }
        }

        stage("Push to Registry"){
            steps{
                sh "docker push 38.242.195.64:7000/passengerwebapp:latest"
                sh "docker push 38.242.195.64:7000/passengerwebapp:${TAG}"
            }
        }
    }
    post{
        always{
            sh "docker rmi -f 38.242.195.64:7000/passengerwebapp:${TAG} 38.242.195.64:7000/passengerwebapp:latest"
        }
    }
}

