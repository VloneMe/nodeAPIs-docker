FROM node:18-alpine

WORKDIR /server

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 4000

CMD [ "yarn", "run", "dev" ]