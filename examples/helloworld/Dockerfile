FROM node:12

RUN mkdir -p /home/app/
COPY . /home/app/

WORKDIR /home/app/

ENTRYPOINT ["/home/app/build_script.sh"]

