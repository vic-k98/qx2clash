'use strict'

const fs = require('fs');
const fetch = require('node-fetch');

const logicConf = require('../config/logic');
const transformation = require('../lib/transformation');
const generateIni = require('../lib/generateIni');
const { CodedError } = require('../lib/error');

const make = {};

make.generate = async (ctx, next) => {
  // 读取临时配置缓存文件
  const quantumultConf = fs.readFileSync(logicConf.filePathQx, 'utf-8');
  const quantumultConfConten = quantumultConf.toString();

  // 格式化后的 json 数据
  const confiObj = transformation({ content: quantumultConfConten });

  // 生成 clash 格式的配置文件
  const clashConf = generateIni(confiObj);
  // 写入到静态文件
  fs.writeFileSync(logicConf.filePathClash, clashConf);

  // 从配置文件中获取订阅链接
  const serverRemote = confiObj['server_remote'].filter(item => item.option.enabled).map(item => item.url);

  // 返回订阅链接
  ctx.result = {
    url: logicConf.fileNameClash,
    serverList: serverRemote
  };
  return next();
}

make.subyaml = async (ctx, next) => {
  const { sublink } = ctx.request.body;

  const response = await fetch(sublink);

  if (response.status === 200) {
    const result = await response['buffer']();
    // 写入到本地文件
    fs.writeFileSync(logicConf.filePathYaml, result);
  } else {
    throw new CodedError('订阅服务错误', response.status);
  }

  // 返回订阅链接
  ctx.result = {
    url: logicConf.fileNameYaml
  };
  return next();
}

module.exports = make;
