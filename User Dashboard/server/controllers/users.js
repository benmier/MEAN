var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports = {

	show: function(req,res){
        Users.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    showOne: function(req,res){
        Users.findOne({_id:req.params.id},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    create: function(req,res){
        var user = new Users(req.body) 
        user.save(function(err){
            if(err)
                console.log(err);
            else{
            	Users.findOne({},function(err,data){
	            if(err)
	                console.log(err);
	            else
	                res.json(data);
	        	}).sort({_id:-1});
            };
        });
    },



}