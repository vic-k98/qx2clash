const redis = require('redis');

const { logger } = require('../middlewares/logger');
const redisConf = require('../config').redis;

const host = redisConf.host;
const port = redisConf.port;

class Redis {
	constructor() {
		this.redisClient = redis.createClient({
			url: `redis://${host}:${port}`,
			legacyMode: true
		});

		// 配置redis的监听事件
		this.redisClient.on('ready', function () {
			logger.info('Redis Client: ready')
		})

		// 连接到 redis-server 回调事件
		this.redisClient.on('connect', function () {
			logger.info('redis is now connected!');
		});

		this.redisClient.on('reconnecting', function () {
			logger.info('redis reconnecting', arguments);
		});

		this.redisClient.on('end', function () {
			logger.info('Redis Closed!');
		});

		this.redisClient.on('warning', function () {
			logger.info('Redis client: warning', arguments);
		});

		this.redisClient.on('error', err => {
			logger.error('Redis Error ' + err);
		});

		// 判断redis是否连接
		if (this.redisClient.isOpen) {
			logger.info('redis is now connected!')
		} else {
			this.redisClient.connect().catch(error => logger.error(error));
		}
	}

	async contect() {
		await this.redisClient.connect().catch(error => logger.error(error));
	}

	quit() {
		this.redisClient.quit();
	}

	async exists(key) {
		return new Promise((resolve, reject) => {
			this.redisClient.exists(key, (err, result) => {
				if (err) {
					logger.error(err);
					reject(false);
				}
				resolve(result);
			})
		})
	}

	// exprires 单位秒
	async set(key, value, exprires) {
		if (typeof value === 'object') {
			value = JSON.stringify(value)
		}
		return new Promise((resolve, reject) => {
			this.redisClient.set(key, value, (err, result) => {
				if (err) {
					reject(false);
				}
				if (!isNaN(exprires)) {
					this.redisClient.expire(key, exprires);
				}
				resolve(result);
			})
		})
	}

	async get(key) {
		return new Promise((resolve, reject) => {
			this.redisClient.get(key, (err, result) => {
				if (err) {
					reject(false);
				}
				resolve(result);
			})
		})
	}

	async remove(key) {
		return new Promise((resolve, reject) => {
			this.redisClient.del(key, (err, result) => {
				if (err) {
					reject(false);
				}
				resolve(result);
			})
		});
	}

	// push 将给定值推入列表的右端 返回值 当前列表长度
	async rPush(key, list, exprires) {
		return new Promise((resolve, reject) => {
			this.redisClient.rPush(key, list, (err, length) => {
				if (err) {
					reject(false);
				}
				if (!isNaN(exprires)) {
					this.redisClient.exports(key, exprires);
				}
				resolve(length);
			})
		})
	}

	// 查询list的值
	async lrange(key, startIndex = 0, stopIndex = -1) {
		return new Promise((resolve, reject) => {
			this.redisClient.lRange(key, startIndex, stopIndex, (err, result) => {
				if (err) {
					reject(false);
				}
				resolve(result)
			})
		})
	}

	// 清除list中n个值为value的项
	async lrem(key, n = 1, value) {
		return new Promise((resolve, reject) => {
			this.redisClient.lrem(key, n, value, (err, result) => {
				if (err) {
					return false
				}
				resolve(result);
			})
		});
	}
}

module.exports = new Redis();