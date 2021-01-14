#!/usr/bin/env bash
rm -rf node_modules/
cp ./example.env.bak .env
/usr/local/bin/docker-compose build
/usr/local/bin/docker-compose up -d --force-recreate
/usr/local/bin/docker-compose run test /test/execute.sh
/usr/local/bin/docker-compose down
open ./reports/html/index.html
