const yaml = require('js-yaml');
const fetch = require('../common/fetch');
const {
  backend,
  configUrl,
  excludeKey
} = require('../config/index');

/**
 * 组装生成订阅链接
 * @param {Array} serverRemote 
 * @returns {String}
 */
function makeUrl (serverRemote) {
  const remoteUrl = serverRemote.map((item) => {
    if (item.option.enabled) {
      return item.url;
    }
  }).filter(item => item).join('|');
  return `${backend}?target=clash&new_name=true&url=${
    encodeURIComponent(remoteUrl)
  }&insert=false&config=${
    encodeURIComponent(configUrl)
  }&exclude=${
    encodeURIComponent(excludeKey)
  }&emoji=true&list=false&tfo=false&scv=false&fdn=false&sort=false`;
}

module.exports = function (subConf) {
  const url = makeUrl(subConf);
  console.log('订阅链接：');
  console.log(url);

  return new Promise(async (resolve, rejecct) => {
    try {
      console.log('----- 开始请求远程配置 -----');

      // 请求远程配置
      const body = await fetch(url, { responseType: 'buffer' });

      console.log('----- 数据请求完成 -----');

      // yaml 转化成 object
      const yamlObj = yaml.load(body);

      // yamlObj.proxies = [];
      // yamlObj.rules = [];
      
      // object 转换成 yaml
      const yamlStr = yaml.dump(yamlObj)

      resolve(yamlStr);
    } catch (err) {
      rejecct(err);
    }
  })
}