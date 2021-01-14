#!/usr/bin/env bash
docker run \
 -v $(pwd)/api:/etc/newman \
 -t postman/newman_alpine33 run todoist_collection.json \
 --suppress-exit-code 1