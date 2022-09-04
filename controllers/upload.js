'use strict'

const fs = require('fs');
const path = require('path');

const config = require('../config');
const transformation = require('../lib/transformation');
const generateIni = require('../lib/generateIni');
const makeSubUrl = require('../lib/makeSubUrl');

const upload = {};
const tempFileName = '/temp/' + 'quantumult' + '.conf'; // file.newFilename
const tempFilePath = path.join(config.publicDir, tempFileName);

upload.upload = async (ctx, next) => {
  const file = ctx.request.files.file;
  // 接收读出流
  const reader = fs.createReadStream(file.filepath);
  // 创建写入流
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

  // 读取临时配置缓存文件
  const tempConf = fs.readFileSync(tempFilePath, 'utf-8');
  const tempContent = tempConf.toString();

  // 格式化后的 json 数据
  const confiObj = transformation({ content: tempContent });

  // 生成 clash 格式的配置文件
  const clashConf = generateIni(confiObj);
  // 写入到静态文件
  fs.writeFileSync(path.join(config.publicDir, 'custom_config.ini'), clashConf);

  console.log(clashConf);

  const subUrl = makeSubUrl(['a','b'], body);
  ctx.result = {
    url: subUrl
  };

  return next();
}

module.exports = upload;
