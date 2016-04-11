var mongoose = require('mongoose');
var People = mongoose.model('People');

module.exports = {

	show: function(req,res){
		People.find({},function(err,people){
			if(err)
				req.json(err);
			else
				req.json(people);
		});
	},

	show_one: function(req,res){
		People.findOne({name:req.params.name},function(err,person){
			if(err)
				req.json(err);
			else
				req.json(person);
		});
	},

	create: function(req,res){
		var new_person = new People({name:req.params.name});
		new_person.save(function(err){
			if(err)
				req.json(err);
			else
				req.json({created:true});
		});
	},

	remove: function(req,res){
		People.remove({name:req.params.name},function(err,person){
			if(err)
				req.json(err);
			else
				req.json({removed:true});
		})
	},
}