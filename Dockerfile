# pull the base image
FROM node:latest

# add app
WORKDIR /app

ADD *.json ./

RUN npm install

ADD . .

CMD npm run build

# set the working direction
# WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# EXPOSE 19000
# EXPOSE 19001

# install app dependencies
# COPY package.json yarn.lock app.json ./

# COPY package-lock.json ./

# RUN npm install
# RUN npm run build

# start app
#CMD npm install -g expo-cli; npm i; expo build:android

# CMD npm install -g expo-cli; npm i; expo build:android