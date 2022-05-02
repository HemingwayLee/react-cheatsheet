FROM node:14

RUN apt-get update && apt-get install -y nginx

RUN mkdir -p /home/app/
COPY . /home/app/

WORKDIR /home/app/

# yarn is there by default
RUN npm install .
RUN npm run build
RUN cp /home/app/dist/* /var/www/html/

ENTRYPOINT nginx && /bin/bash

