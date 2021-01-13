#!/usr/bin/env bash
set -e
echo "Install node dependencies ..."
yarn install
sleep 60
#Start testing
echo "Start executing test"
echo "Remember that auth token , so please paste it on example file then execute npm run test or using KienCangToKen"
echo "Happy Testing"
# yarn run visual-update
yarn test