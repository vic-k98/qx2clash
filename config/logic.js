const path = require('path');
const config = require('./index');

/**
 * 配置文件
 */
const fileNameQx = '/quantumultX.conf'
const fileNameClash = '/clashConfig.ini';
const fileNameYaml = '/sub.yaml';
const filePathQx = path.join(config.staticDir, fileNameQx);
const filePathClash = path.join(config.staticDir, fileNameClash);
const filePathYaml = path.join(config.staticDir, fileNameYaml);

module.exports = {
  fileNameQx,
  fileNameClash,
  fileNameYaml,
  filePathQx,
  filePathClash,
  filePathYaml
}