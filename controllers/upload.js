'use strict'

const fs = require('fs');
const path = require('path');
const config = require('../config');

const upload = {};

upload.upload = async (ctx, next) => {
  const file = ctx.request.files.file;
  // 接收读出流
  const reader = fs.createReadStream(file.filepath);
  // 创建写入流
  const tempFileName = '/temp/' + 'quantumult' + '.conf'; // file.newFilename
  const tempFilePath = path.join(config.publicDir, tempFileName);
  const stream = fs.createWriteStream(tempFilePath);
  // 用管道将读出流 "倒给" 输入流
  reader.pipe(stream);
  // 返回配置文件 url
  const host = ctx.request.header.host;
  ctx.result = {
    url: 'http://' + host + tempFileName
  };

  return next();
}

upload.make = async (ctx, next) => {
  const body = ctx.request.body;
  console.log(body);
  ctx.result = {
    url: 'http://' + host + tempFileName
  };
  return next();
}

module.exports = upload;
