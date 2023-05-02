const constConf = require('./const');
const { getEnv } = require('../lib/getEnv');

const G_APP_NAME = constConf.G_APP_NAME;

module.exports = {
  host: process.env.REDIS_HOST || getEnv('REDIS_HOST') || '127.0.0.1',
  port: 6379,

  // 文件上传
  G_REDIS_KEY_PREFIX_UPLAOD: `${G_APP_NAME}_upload`,
  G_REDIS_EXPRIRES_UPLAOD: 60 * 60, // 10 天
  // 规则列表同步
  G_REDIS_KEY_PREFIX_SYNC_RULES: `${G_APP_NAME}_sync_rules`,
  G_REDIS_EXPRIRES_SYNC_RULES: 60 * 60, // 1 个月
  // qx 转换完生成 clash 的缓存
  G_REDIS_KEY_PREFIX_GENERATE_CLASH: `${constConf.G_APP_NAME}_generate_clash`,
  G_REDIS_EXPRIRES_GENERATE_CLASH: 60 * 60, // 10 个月
  // 远程订阅配置同步到本地
  G_REDIS_KEY_PREFIX_SUBYAML: `${constConf.G_APP_NAME}_subyaml`,
  G_REDIS_EXPRIRES_SUBYAML: 60 * 60 // 3 个月
};