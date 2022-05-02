FROM node:14

RUN mkdir -p /home/app/
COPY . /home/app/

WORKDIR /home/app/

# yarn is there by default
RUN npm install .
RUN npm run build

ENTRYPOINT npm run start && /bin/bash

