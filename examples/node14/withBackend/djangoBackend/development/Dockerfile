FROM python:3.8

RUN apt-get update && apt-get install -y net-tools postgresql-client nodejs npm

RUN mkdir -p /home/app/
COPY . /home/app/

RUN npm install -g concurrently

WORKDIR /home/app/frontend/
RUN npm install .

WORKDIR /home/app/backend/
RUN pip3 install -r requirements.txt


