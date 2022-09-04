'use strict'

const fs = require('fs');

const logicConf = require('../config/logic');

const upload = {};

upload.upload = async (ctx, next) => {
  const file = ctx.request.files.file;

  // 接收读出流
  const reader = fs.createReadStream(file.filepath);
  // 创建写入流
  const stream = fs.createWriteStream(logicConf.filePathQx);
  // 用管道将读出流 "倒给" 输入流
  reader.pipe(stream);

  ctx.result = {
    url: logicConf.fileNameQx
  };
  return next();
}

module.exports = upload;
