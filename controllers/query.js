'use strict'

const { InvalidQueryError } = require('../lib/error');
const Redis = require('../lib/redis');

const query = {};

query.query = async (ctx, next) => {
  const key = ctx.request.query.key;

  if (!key) {
    throw new InvalidQueryError();
  }

  // 查询缓存
  const result = await Redis.get(key);
  if (!result) {
    ctx.result = '';
    ctx.msg = '查询无数据';
  } else {
    ctx.result = result;
  }

  return next();
}

module.exports = query;
