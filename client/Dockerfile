FROM node:slim

WORKDIR /client
COPY package*.json /client/
RUN npm install

COPY . /client/
CMD npm start