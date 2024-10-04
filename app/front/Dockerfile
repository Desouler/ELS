FROM node:16.13.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/angular-14-crud-example /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf