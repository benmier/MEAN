var mongoose = require('mongoose');
var Lifts = mongoose.model('Lifts');

module.exports = {

	show: function(req,res){
        Lifts.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    showOne: function(req,res){
        Lifts.findOne({name:req.params.name},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    showData: function(req,res){
        Lifts.find({},function(err,data){
            if(err)
                console.log(err);
            else{
                var newData = {};
                for(var i=0; i<data.length; i++){
                    for(key in data){
                        if(data[key]==req.params.name)
                            newData[i]=data[i];
                    };
                };
                console.log(newData)
                res.json(newData);
            };
        });
    },

    create: function(req,res){
        Lifts.findOne({name:req.body.name},function(err,data){
            if(err)
                console.log(err);
            else{
                if(data){
                    res.json(data);
                }
                else{
                    var lift = new Lifts(req.body) 
                    lift.save(function(err){
                        if(err)
                            console.log(err);
                        else{
                            Lifts.findOne({},function(err,data){
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