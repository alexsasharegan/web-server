var express = require('express');
var app = express();
var port = 3000;

var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('> Private route hit.');
		next();
	},
	logger: function (req, res, next) {
		console.log(`Request: ${req.method} for '${req.originalUrl}' @${new Date().toString()}`)
		next();
	}
};

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send('ABOUT US')
});

app.use(express.static(__dirname + '/public'));

app.listen(port, function () {
	console.log(`> Server started @port:${port}...`);
});	