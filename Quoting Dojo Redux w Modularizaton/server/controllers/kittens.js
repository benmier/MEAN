var mongoose = require('mongoose');
var Kitten = mongoose.model('Kitten');

module.exports = {
	show: function(req,res){
		Kitten.find({},function(err,kittens){
	        if(err)
	            console.log("Error finding all kittens");
	        else
	            res.render('index', {kittens:kittens});
	    }).sort({_id:-1});
	},

	create: function(req,res){
		var new_kitten = new Kitten({
	    	name: req.body.name,
	        breed: req.body.breed,
	        color: req.body.color,
	        personality: req.body.personality,
	        age: req.body.age,
	        food: req.body.food,
	        toy: req.body.toy,
	    });
	    new_kitten.save(function(err){
	    	if(err)
	    		console.log("Error inserting new kitten");
	    });
	    Kitten.findOne({},function(err,kitten){
	        if(err)
	            console.log("Error finding one kitten");
	        else
	            res.render('show', {kitten:kitten});
	    }).sort({_id:-1});
	},

	show_one: function(req,res){
		Kitten.findOne({_id:req.params.id},function(err,kitten){
	        if(err)
	            console.log("Error finding one kitten");
	        else
	            res.render('show', {kitten:kitten});
	    });
	},

	edit: function(req,res){
		Kitten.findOne({_id:req.params.id},function(err,kitten){
	        if(err)
	            console.log("Error matching DB request");
	        else
	            res.render('edit', {kitten:kitten});
	    }).sort({_id:-1});
	},

	update: function(req,res){
		Kitten.update({_id:req.params.id},{
	        name: req.body.name,
	        breed: req.body.breed,
	        color: req.body.color,
	        personality: req.body.personality,
	        age: req.body.age,
	        food: req.body.food,
	        toy: req.body.toy,
	    },function(err,kitten){
	        if(err)
	            console.log("Error matching DB request");
	        else
	            res.redirect("/kittens/"+req.params.id);
	    });
	}
};