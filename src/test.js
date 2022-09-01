const fs = require('fs');
const { localSubUrl } = require('../config');

const transformation = require('./transformation');
const generateIni = require('./generateIni');
const cmake = require('./cmake');

// 读取本地配置文件
const transResult = transformation({ path: './temp/iPhone-220830.conf' })

generateIni(transResult, '', async (err) => {
  if (err) {
    console.log('create config error: ');
    console.log(err);
  } else {
    console.log('----- 生成 ini 配置文件成功 -----');

    // 获取订阅数据
    const body = await cmake(transResult['server_remote']);

    // 生成 yaml 配置文件
    fs.writeFile('./temp/local-sub.yaml', body, (err) => {
      if (err) {
        console.log('create yaml error: ');
        console.log(err);
      } else {
        console.log('----- 生成 yaml 配置文件成功 -----');
        console.log('本地服务链接：');
        console.log(localSubUrl);
        console.log('----- done -----');
      }
    });
  }
});