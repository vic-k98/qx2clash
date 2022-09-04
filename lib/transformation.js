/**
 * 过滤空行、注释内容，并按节分割成数组
 * @param {Array} arr 
 * @returns {Object}
 */
function formatFetival(arr) {
  const res = {};
  let key = '';
  arr.forEach((item) => {
    // 删除空格、注释
    if (item && !/^[#|;].*/.test(item)) {
      const regRes = item.match(/^\[(.+)\]$/);
      if (regRes) {
        key = regRes[1];
        res[key] = [];
      } else {
        res[key].push(item);
      }
    }
  })
  return res;
}

/**
 * 分离出订阅地址
 * @param {*} arr 
 * @returns Arrary
 */
function formatServerRemote(arr) {
  return arr.map((item) => {
    const subs = item.split(',');
    const url = subs.shift();
    const option = {};
    let tag = ''

    subs.forEach((sub) => {
      const subArr = sub.split('=');
      const key = subArr[0].trim();
      const value  = subArr[1].trim();

      if (key === 'tag') {
        tag = value
      } else {
        option[key] = eval(value);
      }
    })

    return {
      tag,
      url,
      option
    };
  }).filter(item => { if (item) return item });
}

/**
 * 格式化策略组
 * @param {Array} arr 
 * @returns {Arrary}
 */
function formatPolicy(arr) {
  return arr.map((item) => {
    const itemArr = item.split(',').slice(0, -1);
    const first = itemArr.shift().split('=');
    const tag = first[1].trim();
    
    let type = first[0].trim();
    // 暂时支持两种类型，后续补充
    switch (type) {
      case 'static':
        type = 'select';
        break;
      case 'url-latency-benchmark':
        type = 'url-test';
        break;
      default:
        type = '';
    }

    const rules = [];
    const option = {};
    itemArr.forEach((sub) => {
      const subArr = sub.split('=');
      if (subArr.length <= 1) {
        let rule = subArr[0].trim();
        if (/^(direct|reject)$/.test(rule)) {
          rule = rule.toUpperCase();
        }
        rules.push(rule);
      } else {
        const key = subArr[0].trim();
        let value = subArr[1].trim();
        if (key !== 'server-tag-regex') {
          value = eval(value);
        }
        option[key] = value;
      }
    });

    return {
      tag,
      type,
      rules,
      option
    };
  }).filter(item => { if (item) return item })
}

/**
 * 格式化 rules
 * @param {Array} arr 
 * @returns {Arrary}
 */
function formatFilterRemote(arr) {
  return arr.map((item) => {
    const itemArr = item.split(',');
    const url = itemArr.shift();
    const option = {};

    itemArr.forEach((sub) => {
      const subs = sub.split('=');
      const key = subs[0].trim();
      let value = subs[1].trim();

      if (!['tag', 'force-policy'].includes(key)) {
        value = eval(value);
      }
      if (key === 'force-policy' && /^(direct|reject)$/.test(value)) {
        value = value.toUpperCase();
      }
      option[key] = value;
    });

    return {
      url,
      ...option
    };
  })
}

/**
 * 
 * @param {*} content
 * @returns 
 */
module.exports = ({ content }) => {
  // 按换行分成数组
  const contentArr =  content.split('\n');

  // 按节生成数组对象
  const contentMap = formatFetival(contentArr);

  // 处理订阅链接
  const serverRemote = contentMap['server_remote'];
  if (serverRemote && serverRemote.length) {
    contentMap['server_remote'] = formatServerRemote(serverRemote);
  }

  // 处理策略组
  const policy = contentMap['policy'];
  if (policy && policy.length) {
    contentMap['policy'] = formatPolicy(policy);
  }

  // 处理 rules
  const filterRemote = contentMap['filter_remote'];
  if (filterRemote && filterRemote.length) {
    contentMap['filter_remote'] = formatFilterRemote(filterRemote);
  }

  return contentMap;
}