### Just Bookmark It!

Currently developing an API for aiding users to store and delete important hyperlinks. I have built a CI/CD pipeline using Github Actions Workflow for effective development and deployment of code. <br/>
TechStack Used: JavaScript, NestJS, Docker, Github Actions, AWS, PostgreSQL.

#### Clone Project

If you are looking for cloning this project, make sure you have Docker desktop installed on your machine because docker containers will require it for running and an AWS account with an S3 bucket configured. <br/>
For running the project, use:
``` docker compose up ```
in the directory where your docker-compose file resides. Docker will start up both application as well as postgres image and run them as containers.

#### .ENV Example

DATABASE_URL=YOUR_DATABASE_URL<br/>
JWT_SECRET=YOUR_SECRET<br/>

AWS_ACCESS_KEY=YOUR_ACCESS_KEY<br/>
AWS_SECRET_KEY=YOUR_SECRET_KEY<br/>
AWS_S3_REGION=YOUR_AWS_REGION<br/>
AWS_S3_BUCKET=YOUR_S3_BUCKET_NAME<br/>

POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD<br/>
POSTGRES_USER=YOUR_POSTGRES_USER<br/>
POSTGRES_DB=YOUR_POSTGRES_DATABASE_NAME<br/>
POSTGRES_PORT=YOUR_POSTGRES_PORT<br/>

<h3 align="center"><b>Developed with :heart: by <a href="https://github.com/DEV270201">Devansh Shah</a></h3>
