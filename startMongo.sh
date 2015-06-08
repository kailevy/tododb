#! /bin/bash -e

if [ -f "/usr/bin/mongod" ]; then
    /usr/bin/mongod -f /etc/mongodb.conf > /dev/null 2>&1 &
    sleep 5
    while ! nc -vz localhost 27017 &>/dev/null; do
      echo "Waiting for mongo to start..."
      sleep 5;
    done
    echo "mongo started successfully"
  else
    echo "Mongo will not be started because the binary was not found."
    exit 99;
  fi