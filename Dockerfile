FROM node:21

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "yarn","run","dev" ]