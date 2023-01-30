const path = require('path');
const dirConf = require('./index').direcotry;

/**
 * 配置文件
 */
const fileNameQx = '/quantumultX.conf'
const fileNameClash = '/clashConfig.ini';
const fileNameYaml = '/sub.yaml';
const filePathQx = path.join(dirConf.static, fileNameQx);
const filePathClash = path.join(dirConf.static, fileNameClash);
const filePathYaml = path.join(dirConf.static, fileNameYaml);
const fileDirRules = path.join(dirConf.static, 'rules')

module.exports = {
  fileNameQx,
  fileNameClash,
  fileNameYaml,
  filePathQx,
  filePathClash,
  filePathYaml,
  fileDirRules
}