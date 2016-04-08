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
var id = 0;
var users = {};
io.sockets.on('connection', function (socket) {
	var id = 0;
	var users = {};
	socket.on("got_new_user", function(data){
		socket.emit('existing_users', users);
		users[id] = {name:data.name};
		io.emit("new_user", {new_user_name: data.name});
		id++;
	});
	socket.on("disconnect", function(data){
		console.log(data)
		// socket.emit('disconnect_users', users);
		// users[id] = {name:data.name};
		// io.emit("new_user", {new_user_name: data.name});
		// id++;
	});

	// socket.on("reset", function(data){
	// 	count = 0;
	// 	socket.emit("update_count", {count: count})
	// });
});

app.get('/', function(req, res) {
  res.render('index');
})