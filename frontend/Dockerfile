FROM node:20.14.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]