# FROM node:16
# WORKDIR /abc
# COPY index.js .
# CMD ["node", "index.js"]

FROM node:16 as base
WORKDIR /abc
RUN apt-get update
RUN apt-get install tini
COPY package*.json ./
RUN npm install
ENTRYPOINT [ "tini", "--" ]


FROM base as dev
RUN npm i -g nodemon
CMD [ "nodemon", "index.js" ]


FROM base as prod
COPY . .
CMD [ "node","index.js" ]