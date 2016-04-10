var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require("path");

app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "./static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/quoting_dojo');

app.listen(8000, function(){})
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User')

app.get('/', function(req, res) {
    res.render('index');
});

// Add User Request 
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({
    	name: req.body.name,
    	age: req.body.age
    });
    user.save(function(err){
    	if(err)
    		console.log("Error saving to DB")
    	else
    		res.redirect('/');
    });
})
