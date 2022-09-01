const backend = 'http://192.168.31.99:25500/sub';
const configUrl = 'http://192.168.31.99:5500/qx2clash_bf/temp/custom_config.ini';
const excludeKey = '剩余|过期|官网|官方|更新';

const rulesReplacePrefix = 'http://192.168.31.99:5500/ios_rule_script/';
const ruleReplaceReg = /^(.+)rule\/QuantumultX(.+)$/;

const localSubUrl = 'http://192.168.31.99:5500/qx2clash_bf/temp/local-sub.yaml';

module.exports = {
  backend,
  configUrl,
  excludeKey,
  rulesReplacePrefix,
  ruleReplaceReg,
  localSubUrl
}