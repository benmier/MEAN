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

    currentUser: function(req,res){
        console.log(req.session.currentUser)
        res.json(req.session.currentUser);
    },

    create: function(req,res){
        Users.findOne({name:req.body.name},function(err,data){
            if(err)
                console.log(err);
            else{
                if(data){
                    req.session.name = data.name;
                    req.session.id = data._id;
                    console.log(req.session.name)
                    console.log(req.session.id)
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
                                    req.session.currentUser = data;
                                    console.log(req.session.currentUser)
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