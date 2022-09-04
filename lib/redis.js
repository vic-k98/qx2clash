const redis = require('redis');

const host = '127.0.0.1'; // redis服务地址
const port = '6379' // redis服务端口

class Redis {
    constructor() {
        // this.redisClient = redis.createClient({
        //     url: `redis://${host}:${port}`,
        //     legacyMode: true
        // });

        // // 配置redis的监听事件
        // this.redisClient.on('ready', function() {
        //     console.log('Redis Client: ready')
        // })
        
        // // 连接到redis-server回调事件
        // this.redisClient.on('connect', function () {
        //     console.log(new Date(), 'redis is now connected!');
        // });
        
        // this.redisClient.on('reconnecting', function () {
        //     console.log(new Date(), 'redis reconnecting', arguments);
        // });
        
        // this.redisClient.on('end', function () {
        //     console.log('Redis Closed!');
        // });
        
        // this.redisClient.on('warning', function () {
        //     console.log('Redis client: warning', arguments);
        // });

        // this.redisClient.on('error', err => {
        //     console.log('Redis Error ' + err);
        // });
        
        // // 判断redis是否连接
        // if (this.redisClient.isOpen) {
        //     console.log('rredis is now connected!')
        // } else {
        //     this.redisClient.connect().catch(error => console.log(error));
        // }
    }

    // async contect() {
    //     await this.redisClient.connect().catch(error => console.log(error));
    // }

    // quit() {
    //     this.redisClient.quit();
    // }

    // async exists(key) {
    //     return new Promise((resolve, reject) => {
    //         this.redisClient.exists(key, (err, result) => {
    //             if (err) {
    //                 console.log(err);
    //                 reject(false);
    //             }
    //             resolve(result);
    //         })
    //     })
    // }

    // async set(key, value, exprires) {
    //     if (typeof value === 'object') {
    //         value = JSON.stringify(value)
    //     }
    //     return new Promise((resolve, reject)  => {
    //         this.redisClient.set(key, value, (err, result) => {
    //             if (err) {
    //                 reject(false);
    //             }
    //             if (!isNaN(exprires)) {
    //                 this.redisClient.expire(key, exprires);
    //             }
    //             resolve(result);
    //         })
    //     })
    // }

    // async get(key) {
    //     return new Promise((resolve, reject) => {
    //         this.redisClient.get(key, (err, result) => {
    //             if (err) {
    //                 reject(false);
    //             }
    //             resolve(result);
    //         })
    //     })
    // }

    // async remove(key) {
    //     return new Promise((resolve, reject) => {
    //         this.redisClient.del(key, (err, result) => {
    //             if (err) {
    //                 reject(false);
    //             }
    //             resolve(result);
    //         })
    //     });
    // }

    // // push 将给定值推入列表的右端 返回值 当前列表长度
    // async rPush(key, list, exprires) {
    //     return new Promise((resolve, reject) => {
    //         this.redisClient.rPush(key, list, (err, length) => {
    //             if (err) {
    //                 reject(false);
    //             }
    //             if (!isNaN(exprires)) {
    //                 this.redisClient.exports(key, exprires);
    //             }
    //             resolve(length);
    //         })
    //     })
    // }

    // // 查询list的值
    // async lrange(key, startIndex = 0, stopIndex = -1) {
    //     return new Promise((resolve, reject) => {
    //         this.redisClient.lRange(key, startIndex, stopIndex, (err, result) => {
    //             if (err) {
    //                 reject(false);
    //             }
    //             resolve(result)
    //         })
    //     })
    // }

    // // 清除list中n个值为value的项
    // async lrem(key, n = 1, value) {
    //     return new Promise((resolve, reject) => {
    //         this.redisClient.lrem(key, n, value, (err, result) => {
    //             if (err) {
    //                 return false
    //             }
    //             resolve(result);
    //         })
    //     });
    // }
}

module.exports = new Redis();