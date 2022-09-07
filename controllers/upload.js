'use strict'

const fs = require('fs');
const fetch = require('node-fetch');

const { logger } = require('../middlewares/logger')
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

upload.syncRules = async (ctx, next) => {
  const { rulesList } = ctx.request.body;

  const list = []
  rulesList.forEach(async item => {
    logger.info(`开始请求 url: ${item}`);
    const itemArr = item.split('/');
    const name = itemArr.pop();
    const dir = itemArr.pop();
    logger.info(`dir: ${dir}, file: ${name}`);

    const response = await fetch(item);
    if (response.status === 200) {
      const result = await response['buffer']();
      logger.info(`请求成功, 开始写入文件`);
      // 写入到本地文件
      fs.writeFileSync(`${logicConf.fileDirRules}/${name}`, result);
      logger.info(`写入文件完成`);
    } else {
      logger.info(`请求异常, url: ${item}, status: ${response.status}`);
    }
    logger.info(`请求结束 url: ${item}`);
  });

  ctx.result = {};
  return next();
}

module.exports = upload;
