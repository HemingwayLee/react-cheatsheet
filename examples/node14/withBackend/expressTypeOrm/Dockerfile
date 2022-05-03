FROM node:14

RUN apt-get update && apt-get install -y net-tools postgresql-client nginx

RUN mkdir -p /home/app/
COPY . /home/app/

WORKDIR /home/app/frontend/
RUN npm install .
RUN npm run build
RUN cp /home/app/frontend/dist/* /var/www/html
RUN cp /home/app/nginx/default /etc/nginx/sites-enabled/default 

WORKDIR /home/app/backend/
RUN npm install -g nodemon
RUN npm install .
RUN npm ls

CMD npm start && /bin/bash

