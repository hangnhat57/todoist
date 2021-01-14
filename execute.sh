#!/usr/bin/env bash
set -e
echo "Install node dependencies ..."
yarn install
sleep 60
#Start testing
echo "Start executing test"
echo "Happy Testing"
# yarn run visual-update
yarn test