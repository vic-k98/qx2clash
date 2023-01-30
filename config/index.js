'use strict'

const path = require('path');

const G_APP_NAME = 'koa-qx2clash';

// direcotry
const direcotry = {
  static: path.resolve(__dirname, '../public/static'),
  cache: path.resolve(__dirname, '../public/cache'),
  logFilePath: path.resolve(__dirname, `../logs/${G_APP_NAME}.log`),
}

// jwt
const jwt = {
  secret: 'secret'
};

// redis
const redis = {
  host: '127.0.0.1',
  port: 6379
};

// mongoDB
const mongoDB = {
  database: 'mall',
  username: 'root',
  password: 'root',
  host: '127.0.0.1',
  port: 27017
}

module.exports = {
  port: '3000',
  direcotry,
  jwt,
  redis,
  mongoDB
}
