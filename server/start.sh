#!/bin/sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

set -a
START_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$START_DIR/.env"
set +a

cd ./
yarn
yarn build

pm2 stop $APP_NAME
pm2 delete $APP_NAME

export NODE_ENV=production
pm2 start dist/main.js --name "$APP_NAME" --namespace "$APP_PORT" -- start
