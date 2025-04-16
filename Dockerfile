#Building docker image for my application

#basing my application on node image
FROM node:18.20-bullseye-slim

#setting the working directory in the container
WORKDIR /home/app

#copying application dependencies files to the container
COPY ./app/package*.json .

#installing all the required dependencies
RUN npm ci

#copying the entire codebase
COPY ./app .

#running migrations
RUN npx prisma generate

#Building build
RUN npm run build

#exposing port of the container
EXPOSE 3000

#running command for starting the application
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start:prod"]