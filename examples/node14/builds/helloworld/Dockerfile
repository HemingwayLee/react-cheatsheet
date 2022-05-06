FROM node:14

RUN mkdir -p /home/app/
COPY . /home/app/

WORKDIR /home/app/

# yarn is there by default
RUN npm install .
RUN yarn build

ENTRYPOINT yarn start && /bin/bash

