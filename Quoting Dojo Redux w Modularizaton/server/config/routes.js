var mongoose = require('mongoose');
var Kitten = mongoose.model('Kitten')
module.exports = function(app){
	app.get('/', function(req, res) {
	    Kitten.find({},function(err,kittens){
	        console.log(kittens)
	        if(err)
	            console.log("Error matching DB request")
	        else
	            res.render('index', {kittens:kittens});
	    }).sort({_id:-1});
	});
}