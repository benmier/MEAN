var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(8000, function(){})
var io = require('socket.io').listen(server);

mongoose.connect('mongodb://localhost/message_board');

var Schema = mongoose.Schema;
var messageSchema = new mongoose.Schema({
    name: String,
    text: String, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
},{timestamps:true});
var commentSchema = new mongoose.Schema({
    name: String,
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    text: String, 
},{timestamps:true});
app.get('/messages/:id', function (req, res){
    Message.findOne({_id: req.params.id})
    .populate('comments')
    .exec(function(err, message) {
        res.render('message', {message: message});
    });
});
app.post('/messages/:id', function (req, res){
    Message.findOne({_id: req.params.id}, function(err, message){
        var comment = new Comment(req.body);
        comment._message = message._id;
        message.comments.push(comment);
        comment.save(function(err){
            message.save(function(err){
            if(err) { console.log('Error'); } 
            else { res.redirect('/'); }
            });
        });
    });
});


io.sockets.on('connection', function (socket) {
    socket.emit('existing_messages', messages);
});