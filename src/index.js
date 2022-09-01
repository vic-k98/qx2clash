const http = require('http');

const cmake = require('./cmake.js');

const PORT = 8081;

/*
 * Create http server.
 */
function createHttpServer() {
	http.createServer(async function (req, res) {
		const url = req.url
		if (url === '/test') {
			console.log('---- start ----');

			const body = await cmake();

			res.writeHead(200, {
				// 'Content-Type': 'application/json'
				'Content-Type': 'text/plain;charset=utf-8'
			});
			// res.write(body);
			res.write(JSON.stringify(body));
			res.end(function () {
				console.log('---- end ----');
			});
		} else {
			res.end();
		}
	}).listen(PORT, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:' + PORT + '...');
}

createHttpServer();