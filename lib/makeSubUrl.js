const config = require('../config').logic;

/**
 * 全部配置字段
 */
const defaultSubOption = {
  subBackend: '',
  serverRemoteList: [],
  clientType: '',
  insert: false,
  remoteConfig: '',
  excludeRemarks: '',
  includeRemarks: '',
  filename: '',
  appendType: false,
  emoji: true,
  nodeList: false,
  tfo: false,
  scv: false,
  fdn: false,
  sort: false,
  udp: false,
  tpl: {
    surge: { doh: false },
    clash: { doh: false }
  }
 };

/**
 * 组装生成订阅链接
 * @param {Array}  
 * @returns {String}
 */
 module.exports = function (serverRemote = [], option) {
  // 节点链接
  const sourceSub = serverRemote.join('|');

  // 填充默认值
  option = Object.assign(defaultSubOption, option);
  for (let key in config.subUrlOption) {
    if (!option[key]) {
      option[key] = config.subUrlOption[key];
    }
  }

  let subUrl = option.subBackend + '?' + 
    'target=' + option.clientType +
    '&url=' + encodeURIComponent(sourceSub) +
    '&insert=' + option.insert;

  if (option.remoteConfig !== '') {
    subUrl += '&config=' + encodeURIComponent(option.remoteConfig);
  }
  if (option.excludeRemarks !== '') {
    subUrl += '&exclude=' + encodeURIComponent(option.excludeRemarks);
  }
  if (option.includeRemarks !== '') {
    subUrl += '&include=' + encodeURIComponent(option.includeRemarks);
  }
  if (option.filename !== '') {
    subUrl += '&filename=' + encodeURIComponent(option.filename);
  }
  if (option.appendType) {
    subUrl += '&append_type=' + option.appendType.toString();
  }

  subUrl += '&emoji=' + option.emoji.toString();
  subUrl += '&list=' + option.nodeList.toString();
  subUrl += '&tfo=' + option.tfo.toString();
  subUrl += '&scv=' + option.scv.toString();
  subUrl += '&fdn=' + option.fdn.toString();
  subUrl += '&sort=' + option.sort.toString();
  subUrl += '&udp=' + option.udp.toString();

  if (option.tpl.surge.doh === true) {
    subUrl += '&surge.doh=true';
  }
  if (option.clientType === 'clash') {
    if (option.tpl.clash.doh === true) {
      subUrl += '&clash.doh=true';
    }
    subUrl += '&new_name=' + option.new_name.toString();
  }
  return subUrl;
}