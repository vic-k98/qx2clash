const config = {
  // base
  '手动切换': '🔰',
  '节点选择': '🚀',
  '自动优选': '♻️',
  '自动选择': '♻️',
  '自动选择 A': '♻️',
  '自动选择 B': '♻️',
  '自动选择 C': '♻️',
  '自动选择 D': '♻️',
  '解锁流媒体': '🎬',
  '访问海外': '🌍',
  '备用节点': '⛽️',
  // country
  '香港节点': '🇭🇰',
  '日本节点': '🇯🇵',
  '美国节点': '🇺🇲',
  '台湾节点': '🇨🇳',
  '狮城节点': '🇸🇬',
  '新加坡节点': '🇸🇬',
  '韩国节点': '🇰🇷',
  '土耳其节点': '🇹🇷',
  '阿根廷节点': '🇦🇷',
  '菲律宾节点': '🇵🇭',
  '印尼节点': '🇮🇩',
  '英国节点': '🇬🇧',
  // stream
  'Netflix': '🎥',
  '奈飞节点': '🎥',
  '奈飞视频': '🎥',
  'DisneyPlus': '🎥',
  '迪士尼视频': '🎥',
  'PrimeVideo': '🎥',
  'YouTube': '🎥',
  '油管视频': '🎥',
  'PrimeVideo': '🎥',
  'Emby': '🎥',
  // service
  'Spotify': '🎸',
  'Steam': '🎮',
  'GitHub': '⌨️',
  'Amazon': '🅰️',
  'TikTok': '📱',
  'Twitter': '📪',
  'Facebook': '🌐',
  'Instagram': '🌠',
  '电报消息': '📲',
  'Telegram': '📲',
  'Google': '📢',
  '谷歌服务': '📢',
  '微软服务': 'Ⓜ️',
  'Microsoft': 'Ⓜ️',
  '苹果服务': '🍎',
  'Apple': '🍎',
  // base
  '广告拦截': '🛑',
  '全球直连': '🎯',
  '漏网之鱼': '🐟'
}

/**
 * 补全策略组 emoji 图标
 * @param {String} name 
 * @returns {String}
 */
 function replenishEmoji (name) {
  if (['DIRECT', 'REJECT', 'PROXY'].includes(name)) return name;
  return emoji(name) ? `${emoji(name)} ${name}` : name;
}

/**
 * 匹配 emoji
 * @param {String} name 
 * @returns {String}
 */
function emoji (name) {
  return config[name] || ''
}

module.exports = {
  emoji,
  replenishEmoji
}