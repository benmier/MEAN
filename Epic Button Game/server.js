var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(8000, function(){})
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	var count = 0;
	socket.on("button_click", function(data){
		count++;
		socket.emit("update_count", {count: count})
	});
	socket.on("reset", function(data){
		count = 0;
		socket.emit("update_count", {count: count})
	});
});

app.get('/', function(req, res) {
  res.render('index');
})