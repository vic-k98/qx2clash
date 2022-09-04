const path = require('path');
const config = require('./index');

/**
 * 生成规则配置
 */
const rulesReplacePrefix = 'http://192.168.31.99:5500/ios_rule_script/';
const ruleReplaceReg = /^(.+)rule\/QuantumultX(.+)$/;

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
  rulesReplacePrefix,
  ruleReplaceReg,
  fileNameQx,
  fileNameClash,
  fileNameYaml,
  filePathQx,
  filePathClash,
  filePathYaml
}