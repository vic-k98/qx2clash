'use strict'

const fetch = require('node-fetch');

const constConf = require('../config').const;
const { logger } = require('../middlewares/logger');
const transformation = require('../lib/transformation');
const generateIni = require('../lib/generateIni');
const { CodedError } = require('../lib/error');
const { InvalidQueryError } = require('../lib/error');
const Redis = require('../lib/redis');

const G_REDIS_EXPRIRES_GENERATE = 60 * 60; // 1 小时
const G_REDIS_KEY_PREFIX_GENERATE = `${constConf.G_APP_NAME}_generate`;
const G_REDIS_EXPRIRES_SUBYAML = 60 * 60; // 1 小时
const G_REDIS_KEY_PREFIX_SUBYAML = `${constConf.G_APP_NAME}_subyaml`;

const make = {};

make.generate = async (ctx, next) => {
  const { key, replaceRules } = ctx.request.body;

  if (!key) {
    throw new InvalidQueryError();
  }

  // 过滤非法数据
  let reRules = []
  if (replaceRules) {
    reRules = replaceRules.filter(item => {
      if (item.prefix && item.reg && item.middle) {
        return item
      }
    });
  }

  // 查询缓存
  const quantumultConfConten = await Redis.get(key);
  
  if (!quantumultConfConten) {
    ctx.result = '';
    ctx.msg = '未查询到 quantumultX 配置内容';
  }

  // 对 qx 配置进行格式化为 json
  const qxConf2Json = transformation({ content: quantumultConfConten });
  logger.info(`make/generate => qx to json done: ${qxConf2Json}`);

  // 转换成 clash 配置文件格式
  const clashConf = generateIni(qxConf2Json, { replaceRules: reRules });
  logger.info(`make/generate => 转换成 clash 配置文件完成: ${clashConf}`);

  // 写入到 redis 缓存
  const redisKey = `${G_REDIS_KEY_PREFIX_GENERATE}_clash_${new Date().getTime()}`
  const setRes = await Redis.set(redisKey, clashConf, G_REDIS_EXPRIRES_GENERATE);
  logger.info(`make/generate => set redis result: ${redisKey} - ${setRes};`);

  // 从配置文件中获取订阅链接
  const serverRemote = qxConf2Json['server_remote'].filter(item => item.option.enabled).map(item => item.url);

  // 返回订阅链接
  ctx.result = {
    key: redisKey,
    serverList: serverRemote,
    filterList: reRules
  };
  return next();
}

make.subyaml = async (ctx, next) => {
  const { sublink } = ctx.request.body;

  const response = await fetch(sublink);

  if (response.status === 200) {
    const result = await response['buffer']();
    const resStr = result.toString();

    // 写入到 redis 缓存
    const redisKey = `${G_REDIS_KEY_PREFIX_SUBYAML}_${new Date().getTime()}`;
    const setRes = await Redis.set(redisKey, resStr, G_REDIS_EXPRIRES_SUBYAML);
    logger.info(`make/subyaml => set redis result: ${redisKey} - ${setRes};`);

    // 返回订阅链接
    ctx.result = {
      key: redisKey
    };
  } else {
    throw new CodedError('订阅服务错误', response.status);
  }

  return next();
}

module.exports = make;
