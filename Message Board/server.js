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

var messageSchema = new Schema({
    name: {type: String, required: true},
    message: {type: String, required: true}, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
},{timestamps:true});
mongoose.model('Message', messageSchema)

var commentSchema = new Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
},{timestamps:true});
mongoose.model('Comment', commentSchema)

var Message = mongoose.model('Message')
var Comment = mongoose.model('Comment')


app.post('/new_message',function(req,res){
    var new_message = new Message(req.body);
    new_message.save(function(err){
        if(err)
            res.json(err);
        else
            res.redirect('/');
    })
})

app.post('/new_comment/:id',function(req,res){
    Message.findOne({_id:req.params.id}, function(err,message){
        if(err)
            res.json(err);
        else{
            var new_comment = new Comment({
                _message: req.params.id,
                name: req.body.name,
                comment: req.body.comment
            });
            console.log(new_comment)
            new_comment.save(function(err){
                if(err)
                    res.json(err);
                else{
                    message.comments.push(new_comment._id);
                    message.save(function(err){
                        if(err)
                            res.json(err);
                        else
                            res.redirect('/');
                    });
                };
            });
        };  
    });
});


app.get('/',function(req,res){
    Message.find({}).populate('comments').exec(function(err,messages){
        if(err)
            res.json(err);
        else{
            console.log(messages)
            res.render('index',{messages:messages})
        }
    });
});