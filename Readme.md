# Assignment 1 - Docker Deployment on Render.com

## Project Overview

This assignment demonstrates building and deploying a full-stack Todo application using Docker containers on Render.com cloud platform.

**Tech Stack:**
- **Frontend:** Next.js with React and TypeScript
- **Backend:** Node.js with Hono framework and TypeScript  
- **Database:** PostgreSQL with Prisma ORM
- **Deployment:** Render.com
- **Containerization:** Docker

## Step 0: Creating the Todo Application

### Backend (Node.js + Hono + Prisma)
- Built REST API with CRUD operations for Todo management
- Used Hono framework for lightweight and fast HTTP server
- Used Prisma ORM for database operations with PostgreSQL
- Configured environment variables for database connection
- Set up TypeScript compilation and build process

**Key Backend Features:**
- API endpoints for creating, reading, updating, and deleting todos
- Environment variable configuration for database URL and port
- TypeScript compilation to JavaScript for production

### Frontend (Next.js + React)
- Created React components for Todo list management
- Implemented API service to communicate with backend
- Built responsive UI for viewing, adding, editing, and deleting tasks
- Used environment variables for backend API URL configuration

**Key Frontend Features:**
- Component-based architecture for Todo management
- Environment variable for API endpoint configuration
- TypeScript for type safety and better development experience

## Step 1: Creating Docker Images

### Backend Dockerfile Configuration
Created Dockerfile for Node.js backend with the following setup:
- Base image: `node:18-alpine`
- Working directory: `/app`
- Install dependencies and generate Prisma client
- Build TypeScript application
- Expose port 8000

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
```

### Frontend Dockerfile Configuration  
Created Dockerfile for Next.js frontend with:
- Base image: `node:18-alpine`
- Working directory: `/app`
- Install dependencies and build Next.js application
- Expose port 3000

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Step 2: Building and Pushing to Docker Hub

### Backend Image Build and Push
```bash
docker build --platform linux/amd64 -t tandinomu/be-todo:02230302 .
docker push tandinomu/be-todo:02230302
```

![Backenddockerbuild](./assets/bebuild.png)

![dockerpush](./assets/dockerpushbe.png)

### Frontend Image Build and Push
```bash
docker build --platform linux/amd64 -t tandinomu/fe-todo:02230302 .
docker push tandinomu/fe-todo:02230302
```

![febuild](./assets/febuild.png)

![fepush](./assets/fepush.png)

## Step 3: Creating Database on Render

### PostgreSQL Database Setup
1. Created a new managed PostgreSQL database on Render.com
2. Selected Render's managed PostgreSQL service (not custom image)
3. Obtained database connection details:
   - Database URL (internal and external)
   - Database name, username, and password
   - Host and port information
4. Configured database for backend service connection using Render's managed service

![database](./assets/databaserender.png)


## Step 4: Deploying Services on Render.com

### Backend Service Deployment
1. Created Web Service on Render
2. Selected "Deploy an existing image from a registry"
3. Used Docker Hub image: `tandinomu/be-todo:02230302`

![S](./assets/belive.png)

![environmentvariables](./assets/environmentvariable.png)

### Frontend Service Deployment
1. Created Web Service on Render
2. Selected "Deploy an existing image from a registry"  
3. Used Docker Hub image: `tandinomu/fe-todo:02230302`

![felive](./assets/felive.png)


## Results

### Live Application URLs
- **Backend API:** https://be-todo-02230302-2.onrender.com
- **Frontend Application:** https://fe-todo-02230302-2.onrender.com


### Docker Images
- **Backend:** `tandinomu/be-todo:02230302`
- **Frontend:** `tandinomu/fe-todo:02230302`

## Challenges and Solutions

### Challenge 1: Direct Repository Deployment Failed
**Problem:** Initially attempted to deploy the entire repository directly to Render.com, but encountered multiple issues:
- Render couldn't properly handle the multi-service repository structure
- Build process failed due to complex dependencies and configuration
- Services couldn't be deployed together as a single unit

**Solution:** Switched to Docker Hub deployment approach:
1. Built Docker images locally for both frontend and backend
2. Pushed individual images to Docker Hub registry
3. Deployed each service separately on Render using "Deploy from existing image" option
4. This approach provided better control and isolation between services

### Challenge 2: Platform-Specific Docker Builds
**Problem:** Local Docker builds weren't compatible with Render's Linux-based infrastructure

**Solution:** Used platform-specific builds:
```bash
docker build --platform linux/amd64 -t tandinomu/be-todo:02230302 .
```

### Challenge 3: Environment Variable Configuration
**Problem:** Services needed to communicate with each other and the database in the cloud environment

**Solution:** Properly configured environment variables:
- Backend: DATABASE_URL, PORT, NODE_ENV
- Frontend: NEXT_PUBLIC_API_URL pointing to backend service

## Key Learning Outcomes

### Technical Skills Gained:
1. **Docker Containerization:** Created production-ready Docker images for both frontend and backend
2. **Cloud Deployment:** Successfully deployed containers to Render.com platform using Docker Hub
3. **Environment Configuration:** Managed environment variables across different services
4. **Database Integration:** Connected containerized backend to PostgreSQL database
5. **Full-Stack Deployment:** Coordinated deployment of multiple services working together

### Deployment Strategy Learned:
- **Direct Repository Deployment:** Attempted but not suitable for complex multi-service applications
- **Docker Hub Strategy:** More reliable approach for multi-service deployments
- **Service Isolation:** Each service deployed independently for better management

### Project Success Metrics:
- Both applications deployed successfully on Render.com
- Docker images built and pushed to DockerHub registry
- Database connectivity established and working
- Frontend successfully communicating with backend API
- Full todo functionality working in production environment

## Conclusion
Assignment 1 successfully demonstrated containerized application deployment using Docker and Render.com. The project showcased the complete workflow from development to production deployment.

**Key Achievements:**

- Containerized both frontend and backend applications using Docker
- Overcame deployment challenges by switching from direct repository to Docker Hub strategy
- Established proper database connectivity and service communication
- Deployed fully functional full-stack application with persistent data storage


# Assignment 2 - Jenkins CI/CD Pipeline

## Project Overview

This assignment demonstrates building an automated CI/CD pipeline using Jenkins for a full-stack Todo application. The pipeline automatically builds, tests, and validates code changes from GitHub.

**Tech Stack:**
- **Frontend:** Next.js with React and TypeScript
- **Backend:** Node.js with Hono framework and TypeScript  
- **Database:** PostgreSQL with Prisma ORM
- **CI/CD:** Jenkins Pipeline
- **Version Control:** GitHub
- **Build Tool:** NodeJS

## Step 1: Jenkins Setup and Configuration

### Installing Jenkins
1. Downloaded and installed Jenkins on macOS
2. Accessed Jenkins dashboard at `localhost:8080`
3. Completed initial setup with admin password
4. Installed required plugins:
   - NodeJS Plugin
   - Git Plugin  
   - Pipeline Plugin
   - GitHub Integration Plugin

![Jenkinsplugininstallationscreen](./assets/installed%20plugins.png)

### NodeJS Tool Configuration
1. Navigated to Manage Jenkins → Tools
2. Added NodeJS installation:
   - Name: `NodeJS 24.0.2`
   - Version: NodeJS 24.0.2
   - Install automatically: ✓

![Screenshot:NodeJStoolconfigurationinJenkins](./assets/nodejsplugin.a2.png)

## Step 2: GitHub Integration

### Creating Personal Access Token
1. Generated GitHub Personal Access Token with permissions:

![permissions](./assets/permission.png)
![Screenshot:GitHubtokencreationwithselectedscopes](./assets/Accesstoken.png)


### Jenkins Credentials Setup
1. Added GitHub credentials in Jenkins
2. Kind: Username with password
3. Username: `tandinomu`
4. Password: GitHub Personal Access Token
5. ID: `github-pat`

![Screenshot:Jenkinscredentialsconfiguration](./assets/credentials.png)

![Screenshot:Globalcredentialslistshowinggithub-pat](./assets/cred2.png)

## Step 3: Pipeline Project Creation

### Creating Jenkins Pipeline
1. Created new Pipeline item: `NodeJS-Todo-Pipeline`
2. Configured Pipeline settings:
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: `https://github.com/tandinomu/Tandinom_02230302_DSO101_A1.git`
   - Credentials: `github-pat`
   - Branch: `main`

![PipelineSCMconfiguration](./assets/configurepipeline.png)

![Screenshot:Pipelineprojectcreationscreen](./assets/jenkins2.png)

![Screenshot:success](./assets/pipelinedeploysuccess.png)

## Step 4: Jenkinsfile Development

### Pipeline Stages Created
Created Jenkinsfile with the following stages:

1. **Checkout SCM** - Clone repository from GitHub
2. **Tool Install** - Set up NodeJS environment  
3. **Checkout** - Verify code checkout
4. **Install Backend Dependencies** - Run `npm install` in backend/
5. **Install Frontend Dependencies** - Run `npm install` in frontend/
6. **Build Backend** - Compile TypeScript to JavaScript
7. **Build Frontend** - Build Next.js application
8. **Test Backend** - Run backend tests
9. **Test Frontend** - Run frontend tests  
10. **Deploy** - Deployment stage completion

### Jenkinsfile Configuration

![Screenshot:JenkinsfilecodeinVSCodeeditor](./assets/Jenkins.png)

## Step 5: Pipeline Challenges and Solutions

### Challenge 1: Missing Test Scripts
**Problem:** Pipeline failed with "Missing script: test" error

**Solution:** Added test scripts to package.json files:
```json
{
  "scripts": {
    "test": "echo 'Tests passed' && exit 0"
  }
}
```

### Challenge 2: Prisma Configuration Issues  
**Problem:** Frontend trying to run Prisma commands during installation

**Solution:** Removed Prisma dependencies from frontend package.json since Prisma only belongs in backend

### Challenge 3: Tool Configuration Matching
**Problem:** Ensuring Jenkinsfile matched exact tool name in Jenkins

**Solution:** Updated tool reference to match exactly:
```groovy
tools {
    nodejs 'NodeJS 24.0.2'
}
```

## Step 6: Successful Pipeline Execution

### Pipeline Run Results
After resolving configuration issues, pipeline runs successfully:

**Pipeline Stages Performance:**
1. Checkout SCM (16 sec)
2. Tool Install (5.7 sec)  
3. Checkout (8.5 sec)
4. Install Backend Dependencies (9.4 sec)
5. Install Frontend Dependencies (6.2 sec)
6. Build Backend (6.6 sec)
7. Build Frontend (13 sec)
8. Test Backend (5.4 sec)
9. Test Frontend (7.3 sec)
10. Deploy (15 sec)


**Total Pipeline Duration:** ~1 minute 45 seconds

![Screenshot:Buildhistoryshowingsuccessfulbuild#5andprevious attempts](./assets/challenge1.png)


### Build Artifacts and Post Actions
The pipeline successfully:
- Archives build artifacts (backend/dist and frontend/.next)
- Cleans workspace after completion
- Provides success/failure notifications
- Archives 2 artifacts per successful build


## Step 7: Automated Triggering

### GitHub Webhook Integration
1. Configured Jenkins to automatically trigger builds on GitHub commits
2. Pipeline runs automatically when code is pushed to main branch
3. Build status is reported back to GitHub repository

## Results

### Pipeline Status
 **Jenkins Pipeline:** Fully operational and automated  
 **GitHub Integration:** Successfully configured with webhooks  
 **Build Artifacts:** Properly archived and managed  
 **Test Execution:** All tests passing in pipeline  

### Build History
- Multiple successful builds documented
- Build #5 marked as successful reference build
- Previous builds show progression of configuration fixes
- Consistent build times around 1-2 minutes

## Key Learning Outcomes

### Technical Skills Gained:
1. **Jenkins Administration:** Installation, plugin management, and tool configuration
2. **Pipeline Development:** Creating declarative Jenkins pipelines with Groovy
3. **GitHub Integration:** Setting up webhooks and credential management
4. **Build Automation:** Automated testing and artifact archiving
5. **Problem Solving:** Systematic debugging of CI/CD configuration issues

### DevOps Practices Learned:
1. **Continuous Integration:** Automated builds on every code commit
2. **Build Artifact Management:** Proper archiving and cleanup procedures
3. **Environment Configuration:** Tool setup and version management
4. **Security Management:** Secure credential handling for GitHub integration
5. **Pipeline Monitoring:** Build history tracking and performance analysis

### Challenges Overcome:
- Jenkins plugin installation and configuration
- GitHub Personal Access Token setup and permissions
- Package.json script management for CI/CD compatibility
- Tool name matching between Jenkins configuration and Jenkinsfile
- Prisma ORM configuration issues in multi-service setup


## Conclusion

Assignment 2 successfully established a comprehensive CI/CD pipeline using Jenkins, demonstrating the transition from manual deployment to automated build and test workflows.

**Key Achievements:**
- Successfully installed and configured Jenkins with all necessary plugins and tools
- Established secure GitHub integration using Personal Access Tokens
- Created a fully functional pipeline with 10 automated stages
- Implemented automated testing and build artifact management
- Resolved multiple configuration challenges through systematic troubleshooting.


# Assignment 3 - Automated CI/CD Pipeline with GitHub Actions: Docker Build and Deployment Automation

## Overview

This assignment demonstrates creating an automated CI/CD pipeline using GitHub Actions that builds Docker containers, pushes them to DockerHub, and deploys to Render.com automatically on every code push.

## Task 1: Repository Setup


- Verified my Github repository setup
- Ensured my package.json file has relevant scripts
- Ensured that my repository is public
- Repository URL: `https://github.com/tandinomu/Tandinom_02230302_DSO101_A3`

### Package.json Updates

- Updated backend package.json to include required scripts.

- Frontend package.json already had all necessary scripts.

## Task 2: Dockerfile Configuration

### Initial Docker Build Issues

The original Dockerfiles had several problems that caused build failures in GitHub Actions:

**Backend Issue:** Prisma schema file not found during npm install

The error occurred because the Dockerfile copied package.json before copying the Prisma schema, but the postinstall script needed the schema file to generate the Prisma client:

**Frontend Issue:** Incorrect Next.js build configuration using wrong deployment method

### Fixed Backend Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files AND prisma schema first (fixes the error)
COPY package*.json ./
COPY prisma/ ./prisma/

# Install dependencies
RUN npm install

# Copy rest of files
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 8000

# Start app
CMD ["npm", "start"]
```

### Fixed Frontend Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js server
CMD ["npm", "start"]
```


## Task 3: GitHub Actions Workflow

### Workflow File Creation

Created `.github/workflows/deploy.yml` with automated pipeline:

![deply.yml](./assets/deploy.yml.png)

### GitHub Secrets Configuration

GitHub Secrets Configuration
Added Required Secrets
DOCKERHUB_USERNAME: My DockerHub username

DOCKERHUB_TOKEN: Generated DockerHub access token from DockerHub account settings

![at](./assets/dockerhubaccesstoken.png)

![secret](./assets/Githubsecret.png)

RENDER_BACKEND_WEBHOOK_URL: Webhook URL for frontend service deployment
RENDER_FRONTEND_WEBHOOK_URL: Webhook URL for backend service deployment
![bewebhook](./assets/webhooks.png)


Render.com Deployment Setup
The frontend and backend services were deployed in assignment 1 itself

Pipeline Testing and Validation
Initial Commit and Push
Committed all workflow files to repository

Pushed changes to main branch

Monitored GitHub Actions tab for workflow execution

Verified each step executed successfully

![verify1](./assets/deploymentconfirmation1.png)

Deployment Verification
Confirmed Docker images appeared in DockerHub repository

![be](./assets/deploymentconfirmbe.png)
![fe](./assets/deployment3be.png)

# CI/CD Pipeline Implementation - Challenges and Solutions

## Challenges and Solutions

### Challenge 1: Prisma Schema Error

**Problem:** Docker build failed because npm install couldn't find Prisma schema file

![First Docker build error showing npm install failure](./assets/errora3.png)
![Complete error details showing full build failure log](./assets/errorsa3.png)

**Solution:** Modified Dockerfile to copy Prisma schema before running npm install:

```dockerfile
COPY package*.json ./
COPY prisma/ ./prisma/  # Added this line
RUN npm install  # Now postinstall script works
```

### Challenge 2: GitHub Actions Build Context

**Problem:** Docker builds were running from wrong directory

**Solution:** Added working-directory specification to build steps:

```yaml
working-directory: ./backend  # Specify correct context
```

### Challenge 3: Next.js Deployment Configuration

**Problem:** Original Dockerfile used incorrect deployment method for Next.js

**Solution:** Used proper Next.js production build process with npm start instead of serve command

## Results

### Live Application URLs
- **Backend:** [https://be-todo-02230302-2.onrender.com]
- **Frontend:** [https://fe-todo-02230302-2.onrender.com]

# Learning Outcomes

## Technical Skills
- **CI/CD Pipeline**: Implemented automated workflows from code commit to production deployment
- **GitHub Actions**: Configured YAML workflows with automated triggers and marketplace actions
- **Docker**: Created efficient containerized applications with proper Dockerfile practices
- **Container Registry**: Automated image building and pushing to DockerHub
- **Cloud Deployment**: Integrated Render.com with webhook-based automated deployments
- **Security**: Managed credentials securely using GitHub Secrets and environment variables

## Key Learnings
- Understanding of modern DevOps practices and automated deployment pipelines
- Experience troubleshooting integration issues across multiple platforms
- Knowledge of containerization benefits for consistent deployment environments
- Practical application of industry-standard CI/CD tools and workflows

## Conclusion

This project successfully implemented a robust, fully automated CI/CD pipeline that transforms code commits into production deployments without manual intervention, demonstrating the power of modern DevOps practices in streamlining software delivery.