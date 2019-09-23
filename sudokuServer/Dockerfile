FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install all dependencies
COPY package*.json ./

RUN npm install

# Copy the config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Bundle app source
COPY . .

#Capture traffic
EXPOSE 8080

#Run the server
CMD [ "node", "index.js" ]
