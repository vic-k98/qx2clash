'use strict'

const test = {};

test.test = async (ctx, next) => {
  console.log(12313);

  ctx.result = ctx.jwtData;
  return next();
}

module.exports = test;
