/**
 * 生成规则配置
 */
const rulesReplacePrefix = 'http://192.168.31.99:5500/ios_rule_script/';
const ruleReplaceReg = /^(.+)rule\/QuantumultX(.+)$/;

// const localSubUrl = 'http://192.168.31.99:3000/clash/local-sub.yaml';

/**
 * 生成订阅链接默认配置
 */
const subUrlOption = {
  subBackend: 'http://192.168.31.99:25500/sub',
  clientType: 'clash&new_name=true',
  remoteConfig: 'http://192.168.31.99:3000/temp/quantumult.conf',
  excludeRemarks: '剩余|过期|官网|官方|更新|到期'
 }

module.exports = {
  rulesReplacePrefix,
  ruleReplaceReg,
  subUrlOption
}