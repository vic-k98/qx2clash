'use strict'

const fs = require('fs');
const fetch = require('node-fetch');

const Redis = require('../lib/redis');
const { logger } = require('../middlewares/logger');
const redisConf = require('../config').redis;

const {
  G_REDIS_EXPRIRES_UPLAOD,
  G_REDIS_EXPRIRES_SYNC_RULES,
  G_REDIS_KEY_PREFIX_UPLAOD,
  G_REDIS_KEY_PREFIX_SYNC_RULES
} = redisConf;

const upload = {};

upload.upload = async (ctx, next) => {
  const file = ctx.request.files.file;
  const fileName = file.newFilename;
  const redisKey = `${G_REDIS_KEY_PREFIX_UPLAOD}_${fileName}`

  const fileStr = fs.readFileSync(file.filepath, 'utf-8').toString();
  const setRes = await Redis.set(redisKey, fileStr, G_REDIS_EXPRIRES_UPLAOD);
  logger.info(`api/upload => set redis result: ${redisKey} - ${setRes};`);

  ctx.result = {
    key: redisKey,
    tips: `文件缓存有效期1小时`
  };
  return next();
}

upload.syncRules = async (ctx, next) => {
  const { rulesList } = ctx.request.body;

  rulesList.forEach(async item => {
    logger.info(`api/syncRules => 开始同步 url: ${item}`);

    const itemArr = item.split('/');
    const name = itemArr.pop();
    const dir = itemArr.pop();
    logger.info(`api/syncRules => dir: ${dir}, file: ${name}`);
    
    const response = await fetch(item);
    if (response.status === 200) {
      logger.info(`api/syncRules => 请求成功, 开始写入缓存`);
      const result = await response['buffer']();
      const resStr = result.toString();
      const redisKey = `${G_REDIS_KEY_PREFIX_SYNC_RULES}_${name}`
      const setRes = await Redis.set(redisKey, resStr, G_REDIS_EXPRIRES_SYNC_RULES);
      logger.info(`api/syncRules => set redis result: ${redisKey} - ${setRes};`);
    } else {
      logger.info(`api/syncRules => 请求异常, url: ${item}, status: ${response.status}`);
    }
    logger.info(`api/syncRules => 同步完成 url: ${item}`);
  });

  ctx.result = {};
  return next();
}

module.exports = upload;
