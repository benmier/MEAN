var mongoose = require('mongoose');
var Threads = mongoose.model('Threads');

module.exports = {

	show: function(req,res){
        Threads.find({},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    showOne: function(req,res){
        Threads.findOne({_id:req.params.id},function(err,data){
            if(err)
                console.log(err);
            else
                res.json(data);
        });
    },

    create: function(req,res){
        var thread = new Threads(req.body) 
        thread.save(function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/threads');
        });
    },

    createAnswer: function(req,res){
        Threads.findOneAndUpdate(
            req.params._id,
            {$push:{"answers":{
                text:req.body.answer,
                name:req.body.currentUser.name,
                nameId:req.body.currentUser._id,
                upvotes:0,
                downvotes:0,
                createdAt:Date.now(),
                _id:Math.floor(Math.random()*10000000000)}}},
                {new:true},
                function(err,data){
            if(err)
                console.log(err);
            else{
                res.json(data)
            }
        })
    },

    createComment: function(req,res){
        Threads.findOne({_id:req.params._id},function(err, thread){
            for(answers in tread.answers){
                if(req.body.answer._id==answer._id)
            }
        }
            {$push:{"answers.comments":{
                text:req.body.comment,
                name:req.body.currentUser.name,
                nameId:req.body.currentUser._id,
                createdAt:Date.now(),
                _id:Math.floor(Math.random()*10000000000)}}},
                {new:true},
                function(err,data){
            if(err)
                console.log(err);
            else{
                res.json(data)
            }
        })
    },

}