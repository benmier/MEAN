var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require("path");

app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "./static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/kitten_dashboard');

app.listen(8000, function(){})
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
mongoose.model('Kitten', Schema);
var Kitten = mongoose.model('Kitten')

app.get('/', function(req, res) {
    Kitten.find({},function(err,kittens){
        console.log(kittens)
        if(err)
            console.log("Error matching DB request")
        else
            res.render('index', {kittens:kittens});
    }).sort({_id:-1});
});

app.get('/kittens/new', function(req, res) {
    res.render('new');
});

app.get('/kittens/:id', function(req, res) {
    Kitten.findOne({id:req.params.id},function(err,kitten){
        console.log(kitten)
        if(err)
            console.log("Error matching DB request")
        else
            res.render('show', {kitten:kitten});
    });
});

app.post('/kittens', function(req, res) {
    var new_kitten = new Kitten({
    	name: req.body.name,
        breed: req.body.breed,
        color: req.body.color,
        personality: req.body.personality,
        age: req.body.age,
        food: req.body.food,
        toy: req.body.toy,
        id: id
    });
    id++;
    new_kitten.save(function(err){
    	if(err)
    		console.log("Error inserting into DB")
    });
    Quote.findOne({},function(err,quotes){
        if(err)
            console.log("Error matching DB request")
        else
            res.render('show', {kitten:kitten});
    }).sort({id:-1});
})
