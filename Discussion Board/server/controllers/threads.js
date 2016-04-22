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

    vote: function(req,res){
        Threads.findOne({_id:req.params.id},function(err,thread){
            for(index in thread.answers){
                if(req.body.answerId==thread.answers[index]._id){
                    if(req.body.vote=="upvote")
                        thread.answers[index].upvotes++;
                    else
                        thread.answers[index].downvotes++;
                    thread.save(function(err){
                        if(err)
                            console.log(err)
                        else{
                            Threads.findOne({_id:req.params.id},function(err,thread){
                                res.json(thread);
                            })
                        }  
                    })
                }
            }
        })
    },

    createAnswer: function(req,res){
        Threads.findOneAndUpdate(
            {_id:req.params.id},
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
        Threads.findOne({_id:req.params.id},function(err, thread){
            for(index in thread.answers){
                if(req.body.answerId==thread.answers[index]._id){
                    thread.answers[index].comments.push({
                        text:req.body.comment,
                        name:req.body.currentUser.name,
                        nameId:req.body.currentUser._id,
                        createdAt:Date.now(),
                        _id:Math.floor(Math.random()*10000000000)
                        }
                    );
                    thread.save(function(err){
                        if(err)
                            console.log(err);
                        else{
                            Threads.findOne({_id:req.params.id},function(err,thread){
                                res.json(thread);
                            })
                        }
                    })
                }
            }
        })
    },

}