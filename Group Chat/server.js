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
var messages = {};

io.sockets.on('connection', function (socket) {
	socket.emit('existing_messages', messages);
});

socket.on("new_message", function(data){
	messages[id] = {name:data.name, message:data.message};
	io.emit("update_messages", messages[id]);
	id++;
})
socket.on("disconnect", function(){
	io.emit("user_disconnect", users[socket.id])
});

app.get('/', function(req, res) {
  res.render('index');
})