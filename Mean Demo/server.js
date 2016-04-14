var express = require("express");
var app = express();
var bodyParser = require('body-parser'); 
var path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));

app.listen(8000, function(){console.log("listening on port 8000")});