FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

RUN npm run build

CMD node server.js