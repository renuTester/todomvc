pipeline {
  agent any
  tools { nodejs "NodeJS" }
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('Test') {
      steps { sh 'npx cypress run' }
    }
  }
}
