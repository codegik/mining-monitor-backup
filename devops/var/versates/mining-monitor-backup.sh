#!/bin/sh

PATH="$PATH:/home/versates/.nvm/versions/node/v6.11.2/bin"
DIR=/var/versates
APP=mining-monitor-backup
export PATH

cd $DIR/$APP
nohup npm start > $DIR/logs/$APP.log &
