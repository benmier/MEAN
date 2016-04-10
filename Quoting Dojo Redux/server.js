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
var Schema = new mongoose.Schema({
    name: String,
    quote: String
})
mongoose.model('Quote', Schema);
var Quote = mongoose.model('Quote')

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/quotes', function(req, res) {
    var quote = new Quote({
    	name: req.body.name,
    	age: req.body.quote
    });
    
    quote.save(function(err){
    	if(err)
    		res.render('quote', {error: err});
    	else
    		res.render('quote');

    });
})
