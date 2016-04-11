var mongoose = require('mongoose');
var Kitten = mongoose.model('Kitten');

var kittens = require('../controllers/kittens.js');

module.exports = function(app){

	app.get('/', function(req, res) {
	    kittens.show(req,res);
	});

	app.post('/kittens', function(req, res) {
		kittens.create(req,res);	    
	});
	
	app.get('/kittens/new', function(req, res) {
	    res.render('new');
	});

	app.get('/kittens/:id', function(req, res) {
	    kittens.show_one(req,res);
	});

	app.post('/kittens/edit/:id', function(req, res) {
		kittens.edit(req,res);
	});

	app.post('/kittens/edit_submit/:id', function(req, res) {
		kittens.update(req,res);
	});

	app.post('/kittens/delete/:id', function(req, res) {
    	kittens.delete(req,res);
	});
};