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

    update: function(req,res){
        Customers.update({_id:req.body._id},function(err){
            if(err)
                console.log(err);
            else
                res.redirect('/threads')
        })
    },

}