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
        Users.findOne({name:req.params.name},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    submit: function(req,res){
        Users.findOne({name:req.body.name},function(err,user){
            if(err)
                console.log(err);
            else{
                user.workouts.push(req.body.workout);
                user.total_points+=req.body.workout.points;
                user.level = Math.floor((1/50)*(-25+Math.sqrt(635+10*user.total_points)));
                user.save(function(err){
                    if(err)
                        console.log(err);
                    else
                        res.json(true);
                });
            };
        });
    },

    create: function(req,res){
        Users.findOne({name:req.body.name},function(err,data){
            if(err)
                console.log(err);
            else{
                if(data){
                    res.json(data);
                }
                else{
                    var user = new Users(req.body) 
                    user.save(function(err){
                        if(err)
                            console.log(err);
                        else{
                            Users.findOne({},function(err,data){
                                if(err)
                                    console.log(err);
                                else{
                                    res.json(data);
                                }
                            }).sort({_id:-1});
                        };
                    });
                }
            }
        });
    },



}