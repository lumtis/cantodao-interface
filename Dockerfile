FROM node:14

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
