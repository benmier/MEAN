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
        for(var i=0; i<4; i++)
	        poll.votes.push({option:0});
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
        Polls.findOne(
        	{_id:req.params.id},
        	function(err,poll){
            if(err)
                console.log(err);
            else{
            	for(index in poll.votes){
            		if(index==req.body.option){
						poll.votes[index].option++;
            			poll.save(function(err){
            				if(err)
            					console.log(err);
            				else{
            					Polls.findOne({_id:req.params.id},function(err,data){
						            if(err)
						                console.log(err);
						            else
						                res.json(data);
						        });
            				}
            			})
            		}
            	}
            }
        });
    },





}
