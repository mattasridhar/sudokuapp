#FROM alpine:3.1

## Update
#RUN apk add --update nodejs

## Install app dependencies
#COPY package.json /src/package.json
#RUN cd /src; npm install

## Bundle app source
#COPY . /src

#EXPOSE  8080
#CMD ["node", "/src/index.js"]

FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]
