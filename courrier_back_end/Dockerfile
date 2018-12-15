FROM node:10.1-alpine

RUN apk add --no-cache bash \
 && apk add --no-cache --virtual .build-deps make gcc g++ python

RUN mkdir -p /srv/api

WORKDIR /srv/api

# Prevent the reinstallation of node modules at every changes in the source code
COPY ./package.json ./yarn.lock ./

RUN yarn install

# Delete build packages.
RUN apk del .build-deps

COPY ./. ./

CMD yarn start