#!/bin/sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

cd ./
yarn
yarn build

pm2 stop stars-server
pm2 delete stars-server

export NODE_ENV=production
pm2 start ecosystem.config.js
