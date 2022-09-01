const fetch = require('node-fetch');
const https = require('https');
const http = require('http');

const httpAgent = new http.Agent({
	keepAlive: true
});
const httpsAgent = new https.Agent({
	keepAlive: true
});

const defaultOptions = {
  // method: 'GET',
  // headers: {},
  // body: null,
  // redirect: 'follow',
  // signal: null,
  // follow: 20,
  // compress: true,
  // size: 0,
  agent: function(_parsedURL) {
		if (_parsedURL.protocol == 'http:') {
			return httpAgent;
		} else {
			return httpsAgent;
		}
	}
  // highWaterMark: 16384,
  // insecureHTTPParser: false,
};

module.exports = function (url, { option, responseType = 'json' }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...option
      });

      if (response.status === 200) {
        const result = await response[responseType]();
        resolve(result);
      } else {
        reject({
          status: response.status,
          statusText: response.statusText
        });
      }
    } catch (error) {
      reject({
        status: -1,
        error: error
      });
    }
  });
}