var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(8000, function(){})


app.get('/', function(req, res) {
  res.render('index');
})

app.post("/result", function (req, res){
    res.render('process', {info: req.body});
})

