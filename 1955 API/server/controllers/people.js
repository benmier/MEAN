var mongoose = require('mongoose');
var People = mongoose.model('People');

module.exports = {

	show: function(req,res){
		People.find({},function(err,people){
			if(err)
				res.json(err);
			else
				res.json(people);
		});
	},

	show_one: function(req,res){
		People.findOne({name:req.params.name},function(err,person){
			if(err)
				res.json(err);
			else
				res.json(person);
		});
	},

	create: function(req,res){
		var new_person = new People({name:req.params.name});
		new_person.save(function(err){
			if(err)
				res.json(err);
		});
		People.findOne({},function(err,person){
			if(err)
				res.json(err);
			else
				res.json(person);
		}).sort({_id:-1});
	},

	remove: function(req,res){
		People.remove({name:req.params.name},function(err,person){
			if(err)
				res.json(err);
			else
				res.json({removed:true});
		})
	},
}