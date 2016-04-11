var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require("path");
var routes_setter = require('./server/config/routes.js')
id = 0;

app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "./static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/kitten_dashboard');
app.listen(8000, function(){console.log("listening on port 8000")})

var Schema = new mongoose.Schema({
    name: String,
    breed: String,
    color: String,
    personality: String,
    age: Number,
    food: String,
    toy: String,
    id: Number
},{timestamps: true})
var Kitten = mongoose.model('Kitten', Schema)
