FROM node:12

RUN echo "aabavaa"

RUN mkdir -p /home/app/
COPY . /home/app/

WORKDIR /home/app/
RUN ls -a
RUN cat build_script.sh

ENTRYPOINT ["/home/app/build_script.sh"]

