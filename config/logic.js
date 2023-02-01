const path = require('path');
const direcotry = require('./direcotry');

/**
 * 配置文件
 */
const fileNameQx = '/quantumultX.conf';
const fileNameClash = '/clashConfig.ini';
const fileNameYaml = '/sub.yaml';

const filePathQx = path.join(direcotry.static, fileNameQx);
const filePathClash = path.join(direcotry.static, fileNameClash);
const filePathYaml = path.join(direcotry.static, fileNameYaml);
const fileDirRules = path.join(direcotry.static, 'rules')

module.exports = {
  fileNameQx,
  fileNameClash,
  fileNameYaml,
  filePathQx,
  filePathClash,
  filePathYaml,
  fileDirRules
}