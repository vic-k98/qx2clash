'use strict'

const Router = require('koa-router');
const controllers = require('../controllers');

const router = new Router();
router.prefix('/api');

// router.post('/login', controllers.login.login);

// 文件上传
router.post('/upload', controllers.upload.upload);

// 生成 clash 远程配置文件
router.post('/generate', controllers.make.generate);

// 生成 yaml 缓存文件
router.post('/subyaml', controllers.make.subyaml);

module.exports = router;
