const path = require('path');

const G_APP_NAME = require('./const').G_APP_NAME;

module.exports = {
	static: path.resolve(__dirname, '../public/static'),
	cache: path.resolve(__dirname, '../public/cache'),
	logFilePath: path.resolve(__dirname, `../logs/${G_APP_NAME}.log`),
};