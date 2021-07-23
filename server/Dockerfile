FROM node:slim

WORKDIR /server
COPY package*.json /server/
RUN npm install

COPY . /server/
CMD npm start