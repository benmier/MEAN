var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
id = 0;

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "./static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(8000, function(){console.log("listening on port 8000")});


