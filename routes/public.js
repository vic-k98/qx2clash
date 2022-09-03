'use strict'

const Router = require('koa-router');
const controllers = require('../controllers');

const router = new Router();
router.prefix('/api');

// router.post('/login', controllers.login.login);

// 文件上传
router.post('/upload', controllers.upload.upload);

// 生产配置文件
router.post('/make', controllers.upload.make);

module.exports = router;
