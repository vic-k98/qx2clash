'use strict'

const path = require('path');

module.exports = {
  port: '3000',
  secret: 'secret',
  staticDir: path.resolve(__dirname, '../public/static'),
  publicDir: path.resolve(__dirname, '../public/cache'),
  logPath: path.resolve(__dirname, '../logs/koa-template.log'),
  mongoDB: {
    database: 'mall',
    username: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 27017
  }
}
