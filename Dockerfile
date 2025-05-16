#Building docker image for my application
#basing my application on node image
FROM node:20-alpine AS devImage

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

#COPY production related changes
FROM node:20-alpine AS prodImage

WORKDIR /home/app

COPY --from=devImage /home/app/dist ./dist

COPY --from=devImage /home/app/package*.json ./

COPY --from=devImage /home/app/prisma/schema.prisma ./prisma/

RUN npm ci --omit=dev

# install openssl
# by default apline don't have openssl and prisma needs it to function properly
RUN apk update && apk upgrade 

RUN apk add --no-cache openssl

#exposing port of the container
EXPOSE 3000

#running command for starting the application
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start:prod"]