var express = require("express");
var app = express();

app.use(express.static(__dirname + "/client"));

app.listen(8000, function(){console.log("listening on port 8000")});