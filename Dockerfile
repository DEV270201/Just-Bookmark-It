#Building docker image for my application

#basing my application on node image
FROM node:18.20-bullseye-slim

#setting the working directory in the container
WORKDIR /home/app

#copying application dependencies files to the container
COPY package*.json .

#installing all the required dependencies
RUN npm ci

#copying the entire codebase
COPY . .

#exposing port of the container
EXPOSE 3000

#running command for starting the application
CMD [ "npm" , "run" , "start:dev" ]