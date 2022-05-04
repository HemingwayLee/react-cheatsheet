FROM node:14

RUN apt-get update && apt-get install -y net-tools postgresql-client 

RUN mkdir -p /home/app/
COPY . /home/app/

RUN npm install -g concurrently

WORKDIR /home/app/frontend/
RUN npm install .

WORKDIR /home/app/backend/
RUN npm install -g nodemon
RUN npm install .


