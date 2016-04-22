var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Questions = mongoose.model('Questions');

module.exports = {

	show3: function(req,res){
        Questions.findRandom({},{},{limit: 3}, function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    create: function(req,res){
        Questions.findOne({question:req.body.question},function(err,data){
            if(err)
                console.log(err);
            else{
                if(data){
                    res.json(data);
                }
                else{
                    var question = new Questions(req.body) 
                    question.save(function(err){
                        if(err)
                            console.log(err);
                        else{
                            res.json(true);
                        };
                    });
                }
            }
        });
    }
}
