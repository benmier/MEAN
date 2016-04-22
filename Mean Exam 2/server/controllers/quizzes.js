var mongoose = require('mongoose');
var Quizzes = mongoose.model('Quizzes');

module.exports = {

	show: function(req,res){
        Quizzes.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },
	
    create: function(req,res){
       	var quiz = new Quizzes(req.body) 
        quiz.save(function(err){
	        if(err)
	            console.log(err);
	        else{
	            Quizzes.findOne({},function(err,data){
	                if(err)
	                    console.log(err);
	                else{
	                    res.json(data);
	                }
	            }).sort({_id:-1});
        	};
    	});
	},

	score: function(req,res){
		Quizzes.update({_id:req.params.id}, {score:req.body.score,percentage:req.body.percentage}, {new:true}, function(err,data){
            if(err)
                console.log(err);
            else
            	res.json(data);
		});
	}


}
