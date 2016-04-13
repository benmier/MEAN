var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "/client"));

app.listen(8000, function(){console.log("listening on port 8000")});