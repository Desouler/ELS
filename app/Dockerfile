FROM node:16.14.0 AS front
WORKDIR /app
COPY ./front .
RUN npm install
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=front /app/dist/startingProject12 /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add nodejs-current
RUN apk add npm
RUN node --version && npm --version
WORKDIR /usr/app
RUN npm install --global pm2
COPY ./back/package*.json ./
RUN npm install
COPY ./back ./
COPY start.sh /usr/share/start.sh
RUN npm run build
CMD ["/usr/share/start.sh"]
#CMD ["pm2-runtime", "start", "npm", "--", "start"]
