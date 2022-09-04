const { replenishEmoji } = require('../config/emoji');
const { rulesReplacePrefix, ruleReplaceReg } = require('../config/logic');

// 配置文件字符串模版
const templateStr = `
[custom]
;不要随意改变关键字，否则会导致出错

;设置规则标志位
<<<$>>>;设置规则标志位

;设置分组标志位
[[[$]]];设置分组标志位

enable_rule_generator=true
overwrite_original_rules=true
`;

/**
 * 生产规则列表字符串
 * @param {Array} filterRemote 
 * @param {Object} option
 * @returns {String}
 */
function createRuelsStr (rulesConf, option = {
  prefix: rulesReplacePrefix,
  reg: ruleReplaceReg
}) {
  // 过滤禁用的规则
  rulesConf = rulesConf.filter(item => item.enabled);
  return `${rulesConf.map((item) => {
    let rulesLink = item['url'];
    const matchRes = rulesLink.match(option.reg);

    // 替换前缀
    if (matchRes && option.prefix) {
      rulesLink = option.prefix + 'rule/Clash' + matchRes[2];
    }

    // 特殊处理
    let policy = item['force-policy'] || item['tag'];
    if (item['tag'] === 'LAN') {
      policy = '全球直连';
      rulesLink = 'GEOIP,CN';
    }
    if (item['tag'] === 'CN') {
      policy = '漏网之鱼';
      rulesLink = 'FINAL';
    }
    const rulesName = replenishEmoji(policy);
    return `ruleset=${rulesName},${rulesLink}` + '\n';
  }).join('')}`;
}

/**
 * 生产策略组字符串
 * @param {Array} policyConf 
 */
function createPolicyStr (policyConf) {
  const filterMap = []
  return `${policyConf.map((item) => {
    const type = item['type'];
    const tag = item['tag'];
    const rules = item['rules'];
    const option = item['option'];
    const reg = option['server-tag-regex'];

    // 过滤掉不支持的类型
    if (!type) {
      filterMap.push(tag);
      return '';
    }

    // 策略名
    const policyName = replenishEmoji(tag);
    // 策略组
    let policyRules = `${rules.map((rule) => {
      // 过滤不支持策略
      if (filterMap.includes(rule)) return '';
      return '\`[]' + replenishEmoji(rule)
    }).join('')}`;
    // 自动测速
    let autoTest = `\`(${reg})\`http://www.gstatic.com/generate_204\`${300},,${50}`;
    // 根据类型处理策略逻辑, 默认手动选择
    let suffixStr = policyRules;
    if (type === 'url-test') {
      suffixStr = autoTest;
    } else if (!suffixStr && reg) {
      // 手动选择特殊处理
      suffixStr = '\`' + reg;
    }

    return `custom_proxy_group=${policyName}\`${type}${suffixStr}` + '\n';
  }).join('')}`;
}

/**
 * 
 * @param {*} configJson 
 * @param {*} path 
 */
module.exports = function (configJson) {
  // 生成规则列表
  const rulesStr = createRuelsStr(configJson['filter_remote']);
  // 生产策略组
  const policyStr = createPolicyStr(configJson['policy']);

  // 区域替换
  return templateStr.replace('<<<$>>>', rulesStr).replace('[[[$]]]', policyStr);
}