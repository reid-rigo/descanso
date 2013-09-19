var express = require('express')
	, http = require('http');

var app = express();

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static('./public'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/fuck', function(req, res) {
	res.send({ fuck: 'you' });
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
