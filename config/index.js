'use strict'

const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js');

const configs = {};
for (const file of files) {
  if (file.toLowerCase().endsWith('js')) {
    const config = require(`./${file}`);
    configs[`${file.replace(/\.js/, '')}`] = config;
  }
}

module.exports = configs;
