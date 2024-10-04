FROM node:16.13.0

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm", "--", "start"]