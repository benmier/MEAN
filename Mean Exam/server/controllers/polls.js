var mongoose = require('mongoose');
var Polls = mongoose.model('Polls');

module.exports = {

	show: function(req,res){
        Polls.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    showOne: function(req,res){
        Polls.findOne({_id:req.params.id},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    create: function(req,res){
        var poll = new Polls(req.body) 
        poll.save(function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/polls');
        });
    },

    delete: function(req,res){
        Polls.remove({_id:req.params.id},function(err,data){
            if(err)
                console.log(err);
            else
                res.redirect('/polls');
        });
    },

    vote: function(req,res){
    	var selectedOption = req.body.option;
        Polls.findOneAndUpdate(
        	{_id:req.params.id},
        	{$inc: {"option1.votes":1}},
        	function(err,data){
            if(err)
                console.log(err);
            else
                res.redirect('/polls');
        });
    },





}
