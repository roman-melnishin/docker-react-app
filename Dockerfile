FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /frontend

WORKDIR /frontend

COPY package.json /frontend/

RUN npm install

ADD app /frontend/app
