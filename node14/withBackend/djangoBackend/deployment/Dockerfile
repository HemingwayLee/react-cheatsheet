FROM python:3.8

RUN apt-get update && apt-get install -y net-tools postgresql-client curl sudo nginx
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
RUN apt-get install -y nodejs


RUN mkdir -p /home/app/
COPY . /home/app/

# RUN npm install -g concurrently

WORKDIR /home/app/frontend/
RUN npm install .
RUN npm run build
RUN cp /home/app/frontend/dist/* /var/www/html
RUN cp /home/app/nginx/default /etc/nginx/sites-enabled/default 

WORKDIR /home/app/backend/
RUN pip3 install -r requirements.txt

