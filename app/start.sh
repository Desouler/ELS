#!/bin/sh

cd /usr/app
pm2 start ./ecosystem.config.js
nginx -g "daemon off;"
