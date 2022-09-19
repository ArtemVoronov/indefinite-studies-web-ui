FROM node:16

EXPOSE 3000

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD [ "npx", "next", "start", "-p", "${APP_PORT}" ]