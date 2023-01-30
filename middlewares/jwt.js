'use strict'

const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const jwtConf = require('../config').jwt;

const secret = jwtConf.secret;

koaJwt({ secret: secret });

module.exports = function (ctx, next) {
  // 将 token 中的数据解密后存到 ctx 中
  try { 
    if (typeof ctx.request.headers.authorization === 'string') {
      const token = ctx.request.headers.authorization;
      ctx.jwtData = jwt.verify(token, secret);
    } else {
      throw {code: 401, message: 'no authorization'};
    }
  } catch (err) {
    throw {code: 401, message: err.message};
  }
  next()
}
